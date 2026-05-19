import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private repo: Repository<Report>) { }
    async create(price: number, carPlateNumber: string) {
        const report = this.repo.create({ price, carPlateNumber });
        return await this.repo.save(report);
    }
    async findById(id: number) {
        if (!id) {
            return null
        }
        return await this.repo.findBy({ id })
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
        let report = await this.findById(id)
        if (!report) {
            throw new NotFoundException('Report not found');
            // In NestJS, you'd usually use: throw new NotFoundException('User not found');
        }
        Object.assign(report, newReportProps)
        return await this.repo.save(report)
    }
    async delete(id: number) {
        let report = await this.findById(id)
        if (!report) {
            throw new NotFoundException('Report not found');
            // In NestJS, you'd usually use: throw new NotFoundException('User not found');
        }
        await this.repo.remove(report)

    }

}
