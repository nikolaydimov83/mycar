import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity()
export class Report {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    price: number
    
    @Column()
    carPlateNumber: string
    
    @CreateDateColumn()
    createDate: Date

}