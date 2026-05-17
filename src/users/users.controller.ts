import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseInterceptors,
    Session
} from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { Serialize, SerializeInterceptors } from 'src/interceptors/serialize.interceptors';
import { SendUserInfoDto } from './dtos/send-user-info.dto copy';
import { AuthService } from './auth.service';

@Controller('auth')
@Serialize(SendUserInfoDto)
export class UsersController {
    constructor(
        private userService: UsersService,
        private authService: AuthService) { }
    @Get('/colors/:color')
    setColor(@Param('color') color: string, @Session() session: any) {
        session.color = color
    }
    @Get('/colors')
    getColor(@Session() session: any) {
        return session.color
    }
    @Post('/signup')
    async createUser(@Body() body: CreateUserDto, @Session() session:any) {
        const user = await this.authService.signup(body.email, body.password);
        session.userId=user.id
        return user
    }
    @Post('/signin')
    async signin(@Body() body: CreateUserDto, @Session() session:any) {
        const user = await this.authService.signin(body.email, body.password);
        session.userId=user.id;
        return user
    }
    @Get('/findUserById/:id')

    async findUserById(@Param('id') id: number) {
        return await this.userService.findOne(id);
    }
    @Get('/findUsers')
    async findUsers() {
        return await this.userService.findAll()
    }
    @Put('/update/:id')
    async update(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return await this.userService.update(parseInt(id), body)
    }
    @Delete('/delete/:id')
    async delete(@Param('id') id: number) {
        return await this.userService.delete(id);
    }
}
