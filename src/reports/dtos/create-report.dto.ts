import { IsAlphanumeric, IsNumberString } from "class-validator"

export class CreateReportDto {
    @IsNumberString()
    price: number
    @IsAlphanumeric()
    carPlateNumber: string
}