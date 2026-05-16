import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseInterceptors
} from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { Serialize, SerializeInterceptors } from 'src/interceptors/serialize.interceptors';
import { SendUserInfoDto } from './dtos/send-user-info.dto copy';

@Controller('auth')
@Serialize(SendUserInfoDto)
export class UsersController {
    constructor(private userService: UsersService) { }
    @Post('/signup')
    async createUser(@Body() body: CreateUserDto) {
        return await this.userService.create(body.email, body.password)
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
