import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    Req,
    UseGuards,
    Query,
  } from '@nestjs/common';
  import { SalaryService } from './salary.service';
  import { CreateSalaryDto, UpdateSalaryDto } from './salary.dto';
  import { AuthenticatedRequest, AuthGuard } from 'src/auth/auth.guard';
  
  @Controller('salary')
  export class SalaryController {
    constructor(private readonly salaryService: SalaryService) {}
  
    @Post()
    @UseGuards(AuthGuard)
    createSalary(@Body() createSalaryDto: CreateSalaryDto, @Req() req: AuthenticatedRequest) {
      return this.salaryService.createSalary(createSalaryDto, req);
    }
  
    @Get()
    @UseGuards(AuthGuard)
    fetchSalaries(@Req() req: AuthenticatedRequest, @Query('page') page:number = 1, @Query('limit') limit:number = 12) {
      return this.salaryService.fetchSalaries(req, page, limit);
    }
  
    @Get(':id')
    @UseGuards(AuthGuard)
    fetchSalaryById(@Param('id') id: string) {
      return this.salaryService.fetchSalaryById(id);
    }
  
    @Put(':id')
    @UseGuards(AuthGuard)
    updateSalary(
      @Param('id') id: string,
      @Body() updateSalaryDto: UpdateSalaryDto,
    ) {
      return this.salaryService.updateSalary(id, updateSalaryDto);
    }
  
    @Delete(':id')
    @UseGuards(AuthGuard)
    deleteSalary(@Param('id') id: string) {
      return this.salaryService.deleteSalary(id);
    }
  }
  