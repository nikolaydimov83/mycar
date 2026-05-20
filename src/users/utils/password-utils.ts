import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";
const scrypt = promisify(_scrypt);

export class PasswordUtils {
    async createSaltedHashedPass(password: string) {
        const salt = randomBytes(8).toString('hex');
        const hashedPass = (await scrypt(password, salt, 32)) as Buffer;
        const saltAndPassword = salt + '.' + hashedPass.toString('hex');
        return saltAndPassword;
    }
    async hashPass(password: string, salt: string) {
        return ((await scrypt(password, salt, 32)) as Buffer).toString('hex');
    }
}