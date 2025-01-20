import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ClassesDocument } from './classes.schema';
import { CreateClassesDto, UpdateClassesDto } from './classes.dto';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Post()
  createClasses(@Body() createClassesDto: CreateClassesDto) {
    return this.classesService.createClasses(createClassesDto);
  }

  @Get()
  fetchClasses() {
    return this.classesService.fetchClasses();
  }

  @Get(':id')
  fetchClassesById(@Param('id') id: string) {
    return this.classesService.fetchClassesById(id);
  }

  @Put(':id')
  updateClasses(
    @Param('id') id: string,
    @Body() updateClassesDto: UpdateClassesDto,
  ) {
    return this.classesService.updateClasses(id, updateClassesDto);
  }

  @Delete(':id')
  deleteClasses(@Param('id') id: string) {
    return this.classesService.deleteClasses(id);
  }
}
