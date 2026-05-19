import { Body, Controller, Get } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
    constructor (private reportsService:ReportsService){}
    @Get('/create')
    async createReport(@Body() body:CreateReportDto){
        await this.reportsService.create(body.price, body.carPlateNumber);
    }
}
