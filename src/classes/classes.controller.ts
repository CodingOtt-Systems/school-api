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
import { ClassesService } from './classes.service';
import { CreateClassesDto, UpdateClassesDto } from './classes.dto';
import { AuthenticatedRequest, AuthGuard } from 'src/auth/auth.guard';

@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Post()
  @UseGuards(AuthGuard)
  createClasses(@Body() createClassesDto: CreateClassesDto, @Req() req: AuthenticatedRequest) {
    return this.classesService.createClasses(createClassesDto, req);
  }

  @Get()
  @UseGuards(AuthGuard)
  fetchClasses(@Req() req: AuthenticatedRequest) {
    return this.classesService.fetchClasses(req);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  fetchClassesById(@Param('id') id: string) {
    return this.classesService.fetchClassesById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  updateClasses(
    @Param('id') id: string,
    @Body() updateClassesDto: UpdateClassesDto,
  ) {
    return this.classesService.updateClasses(id, updateClassesDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteClasses(@Param('id') id: string) {
    return this.classesService.deleteClasses(id);
  }
}
