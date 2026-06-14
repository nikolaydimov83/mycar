import { IsEmail, IsString } from "class-validator"

export class CreateUserDto{
    @IsEmail()
    email:string
    @IsString()
    password:string
}

//cross check the create user guards