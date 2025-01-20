import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    Query,
} from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherDocument } from './teacher.schema';
import { CreateTeacherDto, UpdateTeacherDto } from './teacher.dto';

@Controller('teacher')
export class TeacherController {
    constructor(private readonly teacherService: TeacherService) {}

    @Post()
    createTeacher(@Body() createTeacherDto: CreateTeacherDto) {
        return this.teacherService.createTeacher(createTeacherDto);
    }

    @Get()
    fetchTeachers(@Query('page') page: number = 1, @Query('limit') limit: number = 15) {
        return this.teacherService.fetchTeachers(page, limit);
    }

    @Get(':id')
    fetchTeacherById(@Param('id') id: string) {
        return this.teacherService.fetchTeacherById(id);
    }

    @Put(':id')
    updateTeacher(
        @Param('id') id: string,
        @Body() updateTeacherDto: UpdateTeacherDto,
    ) {
        return this.teacherService.updateTeacher(id, updateTeacherDto);
    }

    @Delete(':id')
    deleteTeacher(@Param('id') id: string) {
        return this.teacherService.deleteTeacher(id);
    }
}
