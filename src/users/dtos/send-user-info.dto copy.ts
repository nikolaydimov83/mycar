import { Expose } from "class-transformer"

export class SendUserInfoDto{
    @Expose()
    email:string
    @Expose()
    id:number

}