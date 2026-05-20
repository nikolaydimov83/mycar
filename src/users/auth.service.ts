import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "./users.service";
import { scrypt as _scrypt, randomBytes } from "crypto";
import { promisify } from "util";
import { PasswordUtils } from "./utils/password-utils";
const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private passwordUtilsHandler:PasswordUtils) {

    }
    async signup(email: string, password: string) {
        const user = await this.userService.findBy({ email });
        if (user) {
            throw new BadRequestException('User already exists');
        }

        const saltAndPassword = await this.passwordUtilsHandler.createSaltedHashedPass(password);
        return await this.userService.create(email, saltAndPassword);

    }
    async signin(email: string, password: string) {
        const user = await this.userService.findBy({ email });
        if (!user) {
            throw new BadRequestException('Wrong username or password!');
        }
        const [salt, hashedPassFormDB] = user.password.split('.');
        const hashedPass = ((await scrypt(password, salt, 32)) as Buffer).toString('hex');

        if (hashedPass !== hashedPassFormDB) {
            throw new BadRequestException('Wrong username or password!')
        }
        return user

    }

}


