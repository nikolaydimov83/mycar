import {
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from "@nestjs/common";

import { Observable } from "rxjs";
import { map } from "rxjs";
import { plainToClass, plainToInstance } from "class-transformer";
import { SendUserInfoDto } from "src/users/dtos/send-user-info.dto copy";
export function Serialize(dto:any){
    return UseInterceptors(new SerializeInterceptors(dto))
}
export class SerializeInterceptors implements NestInterceptor{
    constructor(private dto:any){}
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        //Here I must put anything that needs to implemented between request is given to the handler
        console.log('Running before the request is habdled. This is my context: ')
        console.log(context)
        return next.handle().pipe(map((data:any)=>{
            //Here I run code that needs to be executed before returning the response
            console.log('Running before response is sent. This is my data ')
            console.log(data)
            
            return plainToInstance(this.dto,data,{  
                excludeExtraneousValues:true
            })
        }))
    }
}