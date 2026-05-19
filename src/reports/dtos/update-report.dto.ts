import { IsAlphanumeric, IsNumberString, IsOptional } from "class-validator"

export class UpdateReportDto {
    @IsNumberString()
    @IsOptional()
    price: number
    
    @IsAlphanumeric()
    @IsOptional()
    carPlateNumber: string
}