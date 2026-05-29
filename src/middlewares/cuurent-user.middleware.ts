import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { User } from "src/users/user.entity";
import { UsersService } from "src/users/users.service";
declare global {
    namespace Express{
        interface Request{
            currentUser?:User|null,
            session:any
        }
    }
}
@Injectable()
export class CurrentUSerMiddleware implements NestMiddleware {
    constructor(private userService: UsersService) { }
    async use(req: Request, res: Response, next: NextFunction) {
      
        const { userId } = req.session || {}

        const currentUser = await this.userService.findOne(userId);
      
        req.currentUser = currentUser;
        next()
    }
}