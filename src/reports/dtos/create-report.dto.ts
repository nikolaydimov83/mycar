import { Type } from "class-transformer"
import { IsAlphanumeric, IsDefined, IsLatitude, IsLongitude, isNumber, IsNumber, IsNumberString, IsOptional, IsString, Max, Min } from "class-validator"


export class CreateReportDto {
    @IsNumberString()
    price: number

    @IsAlphanumeric()
    carPlateNumber: string

    @IsString()
    mark: string

    @IsString()
    model: string

    @IsLongitude()
    lng: number

    @IsLatitude()
    lat: number

    @Type(()=>Number)
    @IsNumber()
    mileage: number

    @Type(()=>Number)
    @IsNumber()
    @Min(1930)
    @Max(2026)
    year: number
}