import { IsAlphanumeric, IsDefined, IsLatitude, IsLongitude, IsNumberString, IsOptional } from "class-validator"


export class GetEstimateDto {


    @IsAlphanumeric()
    carPlateNumber: string

    @IsDefined()
    mark: string

    @IsNumberString()
    lng: number

    @IsNumberString()
    lat:number

    @IsNumberString()
    mileage:number
}