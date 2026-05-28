import { Expose, Transform } from "class-transformer"


export class ReportDto {
    @Expose()
    price: number

    @Expose()
    carPlateNumber: string

    @Expose()
    mark: string

    @Expose()
    lng: number

    @Expose()
    lat: number

    @Expose()
    mileage: number

    @Expose()
    @Transform(({obj})=>obj.user.id)
    userId:number
}