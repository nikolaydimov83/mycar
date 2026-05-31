import { Test } from "@nestjs/testing"
import { AuthService } from "./auth.service"
import { UsersService } from "./users.service";
import { BadRequestException } from "@nestjs/common";
import { User } from "./user.entity";
import { PasswordUtils } from "./utils/password-utils";
let service: AuthService;
let fakeUserService: Partial<UsersService>
const users:User[]=[]
describe('Testing Authentication service', () => {
    beforeEach(async () => {
        fakeUserService = {
            findBy: (userProp) => {
                const user = users.filter((user)=>user.email===userProp.email);
                return Promise.resolve(user[0])
            },
            create: (email: string, password: string) => {
                users.push({
                    email, password, id: users.length + 1,
                    reports: []
                })
                return Promise.resolve(users[users.length-1])
            }
        }
        const module = await Test.createTestingModule({
            providers:
                [
                    AuthService,
                    {
                        provide: UsersService,
                        useValue: fakeUserService
                    },
                    PasswordUtils

                ]
        }).compile();
        service = module.get(AuthService);
    })
    it('can create instance of the Authetication service', async () => {

        expect(service).toBeDefined()
    });
    it('can signup and password is salted and hashed', async () => {
        const user = await service.signup('niki@abv.bg', '1234');
        const [salt, hash] = user.password.split('.')
        expect(salt.length).toBe(16)
        expect(hash.length).toBe(64)
    })
    it('Throws bad exception error if user exists', async () => {
        //fakeUserService.findBy = (userProp) => Promise.resolve({ id: 1, email: 'niki@abv.bg', password: "29b8791fce39d576.d50208a436705be6ce6a6984b52ba9935869e0403eb6e6b18c61c100ca0323f1" })
        await expect(service.signup('niki@abv.bg', '1234')).rejects.toThrow(BadRequestException)
    })
    it('can signin user with correct password and email', async () => {
        //fakeUserService.findBy = (userProp) => Promise.resolve({ id: 1, email: 'niki@abv.bg', password: "29b8791fce39d576.d50208a436705be6ce6a6984b52ba9935869e0403eb6e6b18c61c100ca0323f1" })
        const user = await service.signin('niki@abv.bg', '1234');
        expect(user.email).toBe('niki@abv.bg')

    })
    it('cannot sign a user with incorrect password', async () => {
       // fakeUserService.findBy = (userProp) => Promise.resolve({ id: 1, email: 'niki@abv.bg', password: "29b8791fce39d576.d50208a436705be6ce6a6984b52ba9935869e0403eb6e6b18c61c100ca0323f1" })
        await expect(service.signin('niki@abv.bg', '12345')).rejects.toThrow(BadRequestException)
    })
    it('cannot sign a user with incorrect email', async () => {
        
        //fakeUserService.findBy = (userProp) => Promise.resolve({ id: 1, email: 'niki@abv.bg', password: "29b8791fce39d576.d50208a436705be6ce6a6984b52ba9935869e0403eb6e6b18c61c100ca0323f1" })
        await expect(service.signin('kiki@abv.bg', '1234')).rejects.toThrow(BadRequestException)
    })    
})
