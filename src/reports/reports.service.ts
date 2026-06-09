import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private repo: Repository<Report>) { }
    async create(reportObject: CreateReportDto, user: User) {
        const { price, carPlateNumber, mark, lng, lat, mileage } = reportObject
        
        const report = this.repo
            .create({...reportObject,user});
        return await this.repo.save(report);
    }

    async findByOneId(id: number) {
        if (!id) {
            return null
        }
        return await this.repo.findOne({ 
            where:{id},
            relations:['user']
         })
    }
    async findByPlateNumber(carPlateNumber: string) {
        if (!carPlateNumber) {
            return null
        }
        return await this.repo.findBy({ carPlateNumber })
    }
    async findAll() {
        return await this.repo.find()
    }
    async update(id: number, newReportProps: Partial<Report>) {
        let report = await this.findByOneId(id)
        if (!report) {
            throw new NotFoundException('Report not found');
            // In NestJS, you'd usually use: throw new NotFoundException('User not found');
        }
        Object.assign(report, newReportProps)
        return await this.repo.save(report)
    }
    async updateReportprops(id: number, newReportProps: Partial<Report>) {
        let report = (await this.findByOneId(id))
        if (!report) {
            throw new NotFoundException('Report not found');
            // In NestJS, you'd usually use: throw new NotFoundException('User not found');
        }

        report = {...report, ...newReportProps}
      
        return await this.repo.save(report)
    }
    async delete(id: number) {
        let report = await this.findByOneId(id)
        if (!report) {
            throw new NotFoundException('Report not found');
            // In NestJS, you'd usually use: throw new NotFoundException('User not found');
        }
        await this.repo.remove(report)

    }

}
