import {
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Injectable
} from "@nestjs/common";

import { Observable } from "rxjs";
import { UsersService } from "src/users/users.service";

@Injectable()
export class CurrentUserInterceptors implements NestInterceptor {
    constructor(private userService: UsersService) { }
  async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {                                                    
      const request = context.switchToHttp().getRequest();                                                                                          
      const userId = request.session?.userId;
                                                                          
      const currentUser = await this.userService.findOne(userId);                                                                                   
     
      request.currentUser = currentUser;                                                                                                            
      return next.handle();                                                                                                                       
  }                                                                                                                                                 
    
}