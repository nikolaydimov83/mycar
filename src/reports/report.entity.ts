import { IsNumberString } from "class-validator";
import { User } from "src/users/user.entity";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from "typeorm";

@Entity()
export class Report {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column({default:false})
    approved:boolean

    @Column()
    price: number

    @Column()
    carPlateNumber: string

    @Column()
    mark: string

    @Column()
    lng: number

    @Column()
    lat: number

    @IsNumberString()
    mileage: number

    @CreateDateColumn()
    createDate: Date
    
    @ManyToOne(()=>User, (user)=>user.reports)
    user:User




}