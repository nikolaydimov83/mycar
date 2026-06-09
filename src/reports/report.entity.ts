import { IsLatitude, IsLongitude, isLongitude, IsNumber, IsNumberString, Max, Min } from "class-validator";
import { User } from "src/users/user.entity";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from "typeorm";

@Entity()
export class Report {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ default: false })
    approved: boolean

    @Column()
    price: number

    @Column()
    carPlateNumber: string

    @Column()
    mark: string

    @Column()
    model: string

    @Column()
    @IsLongitude()
    lng: number

    @Column()
    @IsLatitude()
    lat: number

    @Column()
    @IsNumber()
    mileage: number

    @Column()
    @IsNumber()
    @Min(1930)
    @Max(2026)
    year: number

    @CreateDateColumn()
    createDate: Date

    @ManyToOne(() => User, (user) => user.reports)
    user: User




}