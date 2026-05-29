import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/user.decorators';
import { User } from 'src/users/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptors';
import { ReportDto } from './dtos/report.dto';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { GetEstimateDto } from './dtos/get-estimate.dto';

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
    @UseGuards(AdminGuard)
    @Serialize(ReportDto)
    @Patch('/approve/:id')
    async changeStatusReport(@Param("id") id: number, @Body() body: ApproveReportDto) {
        return await this.reportsService.updateReportprops(id, body)
    }

    @Get('/get-estimate')
    async getEstimate(@Query() query:GetEstimateDto){
        
    }
}
