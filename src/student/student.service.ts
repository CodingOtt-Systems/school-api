import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student, StudentDocument } from './student.schema';
import { CreateStudentDto, UpdateStudentDto } from './student.dto'

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private readonly studentModel: Model<StudentDocument>,
  ) {}

  async createStudent(createStudentDto: CreateStudentDto): Promise<StudentDocument> {
    try {
      const newStudent = new this.studentModel(createStudentDto);
      return await newStudent.save();
    } 
    catch (error) {
      throw new InternalServerErrorException('Failed to create student');
    }
  }

  async fetchStudents(page: number, limit: number): Promise<{data: StudentDocument[], total: number}> {
    try {
      const skip = (page - 1) * limit;

      const [data, total] = await Promise.all([
        this.studentModel.find().skip(skip).limit(limit),
        this.studentModel.countDocuments(),
      ]);

      return { data, total };
    } 
    catch (error) {
      throw new InternalServerErrorException('Failed to fetch students');
    }
  }

  async fetchStudentById(id: string): Promise<StudentDocument> {
    try {
      const student = await this.studentModel.findById(id);
      
      if (!student) 
        throw new NotFoundException('Student not found');
      
      return student;
    } 
    catch (error) {
      throw new InternalServerErrorException('Failed to fetch student');
    }
  }

  async updateStudent(id: string, updateStudentDto: UpdateStudentDto): Promise<StudentDocument> {
    try {
      const updatedStudent = await this.studentModel.findByIdAndUpdate(
        id,
        { $set: updateStudentDto },
        { new: true }
      );

      if (!updatedStudent) 
        throw new NotFoundException('Student not found');
      

      return updatedStudent;
    } 
    catch (error) {
      throw new InternalServerErrorException('Failed to update student');
    }
  }

  async deleteStudent(id: string): Promise<{ message: string }> {
    try {
      const deletedStudent = await this.studentModel.findByIdAndDelete(id);

      if (!deletedStudent) 
        throw new NotFoundException('Student not found');
      

      return { message: 'Student successfully deleted' };
    } 
    catch (error) {
      throw new InternalServerErrorException('Failed to delete student');
    }
  }
}
