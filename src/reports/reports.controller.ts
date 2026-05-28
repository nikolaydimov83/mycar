import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/user.decorators';
import { User } from 'src/users/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptors';
import { ReportDto } from './dtos/report.dto';

@Controller('reports')
@UseGuards(AuthGuard)

export class ReportsController {
    constructor(private reportsService: ReportsService) { }
    @Serialize(ReportDto)
    @Post('/create')
    async createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {

       return await this.reportsService
            .create(body, user);
    }
}
