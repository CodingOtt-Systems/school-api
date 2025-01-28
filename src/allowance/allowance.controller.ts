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
  } from '@nestjs/common';
  import { AllowanceService } from './allowance.service';
  import { CreateAllowanceDto, UpdateAllowanceDto } from './allowance.dto';
  import { AuthenticatedRequest, AuthGuard } from 'src/auth/auth.guard';
  
  @Controller('allowance')
  export class AllowanceController {
    constructor(private readonly allowanceService: AllowanceService) {}
  
    @Post()
    @UseGuards(AuthGuard)
    createAllowance(
      @Body() createAllowanceDto: CreateAllowanceDto,
      @Req() req: AuthenticatedRequest,
    ) {
      return this.allowanceService.createAllowance(createAllowanceDto, req);
    }
  
    @Get()
    @UseGuards(AuthGuard)
    fetchAllowances(@Req() req: AuthenticatedRequest) {
      return this.allowanceService.fetchAllowances(req);
    }
  
    @Get(':id')
    @UseGuards(AuthGuard)
    fetchAllowanceById(@Param('id') id: string) {
      return this.allowanceService.fetchAllowanceById(id);
    }
  
    @Put(':id')
    @UseGuards(AuthGuard)
    updateAllowance(
      @Param('id') id: string,
      @Body() updateAllowanceDto: UpdateAllowanceDto,
    ) {
      return this.allowanceService.updateAllowance(id, updateAllowanceDto);
    }
  
    @Delete(':id')
    @UseGuards(AuthGuard)
    deleteAllowance(@Param('id') id: string) {
      return this.allowanceService.deleteAllowance(id);
    }
  }
  