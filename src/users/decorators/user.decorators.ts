import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import { UsersService } from "../users.service";
import { Repository } from "typeorm";

export const CurrentUser = createParamDecorator(
    (data: any, context: ExecutionContext) => {
        const request =context.switchToHttp().getRequest();
        return request.currentUser
        
    })