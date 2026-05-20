import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { BadRequestException } from '@nestjs/common';
import { PasswordUtils } from './utils/password-utils';


describe('Testing UsersController', () => {
  let controller: UsersController;
  let fakeUserServive: Partial<UsersService>;
  let fakeAuthServive: Partial<AuthService>;
  const users: User[] = [];

  beforeEach(async () => {
    const passwordUtilsHandler = new PasswordUtils();
    let fakeUserServive = {
      findBy: (userProp: Partial<User>) => {
        const user = users.filter((user) => user.email === userProp.email);
        return Promise.resolve(user[0])
      },
      create: (email: string, password: string) => {
        users.push({ email, password, id: users.length + 1 })
        return Promise.resolve(users[users.length - 1])
      }

    }
    let fakeAuthServive = {
      signup: async (email: string, password: string) => {
        const user = await fakeUserServive.findBy({ email });
        if (user) {
          throw new BadRequestException('User already exists');
        }

        const saltAndPassword = await passwordUtilsHandler.createSaltedHashedPass(password);
        return await fakeUserServive.create(email, saltAndPassword);
      },
      signin: async (email: string, password: string) => {
        const user = await fakeUserServive.findBy({ email });
        if (!user) {
          throw new BadRequestException('Wrong username or password!');
        }
        const [salt, hashedPassFormDB] = user.password.split('.');
        const hashedPass = await passwordUtilsHandler.hashPass(password, salt);

        if (hashedPass !== hashedPassFormDB) {
          throw new BadRequestException('Wrong username or password!')
        }
        return user

      }

    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUserServive
        },
        {
          provide: AuthService,
          useValue: fakeAuthServive
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should succesfully signup user when user is not existing', async () => {
    const user = await controller.signUp({ email: 'niki@abbreviate.bg', password: '1234' }, {})
    expect(user).toBeDefined();
    expect(user.email).toBe('niki@abbreviate.bg');
  })
});


