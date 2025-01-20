import { Controller, Post, Get, Param, Body, Patch, Delete, Query } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto, UpdateStudentDto } from './student.dto'

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  createStudent(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.createStudent(createStudentDto);
  }

  @Get()
  fetchStudents(@Query('page') page: number = 1, @Query('limit') limit: number = 15) {
    return this.studentService.fetchStudents(page, limit);
  }

  @Get(':id')
  fetchStudentById(@Param('id') id: string) {
    return this.studentService.fetchStudentById(id);
  }

  @Patch(':id')
  updateStudent(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.updateStudent(id, updateStudentDto);
  }

  @Delete(':id')
  deleteStudent(@Param('id') id: string) {
    return this.studentService.deleteStudent(id);
  }
}
