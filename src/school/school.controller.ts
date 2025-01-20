import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, Query } from '@nestjs/common';
import { SchoolService } from './school.service';
import { CreateSchoolDto, UpdateSchoolDto } from './school.dto';

@Controller('schools')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Post()
  createSchool(@Body() createSchoolDto: CreateSchoolDto) {
    return this.schoolService.createSchool(createSchoolDto);
  }

  @Get()
  fetchSchools(@Query('page') page: number = 1, @Query('limit') limit: number = 15) {
    return this.schoolService.fetchSchools(page, limit);
  }

  @Get(':id')
  fetchSchoolById(@Param('id') id: string) {
    return this.schoolService.fetchSchoolById(id);
  }

  @Put(':id')
  updateSchool(
    @Param('id') id: string,
    @Body() updateData: UpdateSchoolDto,
  ) {
    return this.schoolService.updateSchool(id, updateData);
  }

  @Delete(':id')
  deleteSchool(@Param('id') id: string) {
    return this.schoolService.deleteSchool(id);
  }
}
