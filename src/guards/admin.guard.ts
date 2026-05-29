import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { User } from "src/users/user.entity";
import { UsersService } from "src/users/users.service";


@Injectable()
export class AdminGuard implements CanActivate{
    constructor(private userService: UsersService) { }
    async canActivate(context: ExecutionContext): Promise<boolean>  {
        const request =  context.switchToHttp().getRequest();
        const currentUser = request.currentUser
    
        if (!currentUser){
            return false
        }
        if (currentUser.admin){
            return true
        }
        else{
            return false
        }


    }
}