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
  import { EmployeeService } from './employee.service';
  import { CreateEmployeeDto, FetchEmployeeQueryDto, UpdateEmployeeDto } from './employee.dto';
  import { AuthenticatedRequest, AuthGuard } from 'src/auth/auth.guard';
import { PaginationDto } from 'src/common/dto';
  
  @Controller('employee')
  export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) {}
  
    @Post()
    @UseGuards(AuthGuard)
    createEmployee(@Body() body: CreateEmployeeDto, @Req() req: AuthenticatedRequest) {
      return this.employeeService.createEmployee(body, req);
    }
  
    @Get()
    @UseGuards(AuthGuard)
    fetchEmployees(@Req() req: AuthenticatedRequest, @Query() query: FetchEmployeeQueryDto) {
      return this.employeeService.fetchEmployees(req, query);
    }
  
    @Get(':id')
    @UseGuards(AuthGuard)
    fetchEmployeeById(@Param('id') id: string) {
      return this.employeeService.fetchEmployeeById(id);
    }
  
    @Put(':id')
    @UseGuards(AuthGuard)
    updateEmployee(
      @Param('id') id: string,
      @Body() updateEmployeeDto: UpdateEmployeeDto,
    ) {
      return this.employeeService.updateEmployee(id, updateEmployeeDto);
    }
  
    @Delete(':id')
    @UseGuards(AuthGuard)
    deleteEmployee(@Param('id') id: string) {
      return this.employeeService.deleteEmployee(id);
    }
  }
  