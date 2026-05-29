import { Transform, Type } from "class-transformer";
import { IsBoolean, IsNumberString } from "class-validator";

export class ApproveReportDto{
    @Transform(({value})=>value===true||value==='true')
    @IsBoolean()
    approved:boolean
}