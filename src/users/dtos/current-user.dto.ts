import { Expose } from "class-transformer"
import { UsersService } from "../users.service"
import { ExecutionContext } from "@nestjs/common"

export class CurrentUserDto {

    @Expose()
    email: string
    @Expose()
    id: number

}