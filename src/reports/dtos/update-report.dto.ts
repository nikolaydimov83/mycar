import { IsAlphanumeric, IsDefined, IsLatitude, IsLongitude, IsNumberString, IsOptional } from "class-validator"

export class UpdateReportDto {
    @IsNumberString()
    @IsOptional()
    price: number

    @IsAlphanumeric()
    @IsOptional()
    carPlateNumber: string


    @IsDefined()
    @IsOptional()
    mark: string

    @IsLongitude()
    @IsOptional()
    lng: number

    @IsLatitude()
    @IsOptional()
    lat: number
    
    @IsNumberString()
    @IsOptional()
    mileage:number
}