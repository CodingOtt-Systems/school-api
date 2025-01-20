import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Teacher, TeacherDocument } from './teacher.schema';
import { CreateTeacherDto, UpdateTeacherDto } from './teacher.dto';

@Injectable()
export class TeacherService {
  constructor(
    @InjectModel(Teacher.name) private readonly teacherModel: Model<TeacherDocument>,
  ) {}

  async createTeacher(createTeacherDto: CreateTeacherDto): Promise<TeacherDocument> {
    try {
        return await this.teacherModel.create(createTeacherDto);
    }
    catch(error)
    {
        throw new InternalServerErrorException("Failed to create teacher")
    }
  }

  async fetchTeachers(page: number, limit: number): Promise<{data: TeacherDocument[], total: number}> {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.teacherModel.find().skip(skip).limit(limit),
      this.teacherModel.countDocuments(),
    ]);

    return { data, total };
  }

  async fetchTeacherById(id: string): Promise<TeacherDocument> {
    try {
        const teacher = await this.teacherModel.findById(id);
        if (!teacher) throw new NotFoundException('Teacher not found');
        return teacher;
    }
    catch(error)
    {
        throw new InternalServerErrorException("Failed to fetch teachers")
    }
  }

  async updateTeacher(id: string, updateTeacherDto: UpdateTeacherDto): Promise<TeacherDocument> {
    try {
        const updatedTeacher = await this.teacherModel.findByIdAndUpdate(id, updateTeacherDto, { new: true })

        if (!updatedTeacher) 
            throw new NotFoundException('Teacher not found');

        return updatedTeacher;
    }
    catch(error)
    {
        throw new InternalServerErrorException("Failed to update teacher")
    }
  }

  async deleteTeacher(id: string): Promise<{ message: string }> {
    try {
        const deletedTeacher = await this.teacherModel.findByIdAndDelete(id);

        if (!deletedTeacher) 
            throw new NotFoundException('Teacher not found');
        
        return { message: 'Teacher deleted successfully' };
    }
    catch(error)
    {
        throw new InternalServerErrorException("Failed to delete teacher")
    }
  }
}
