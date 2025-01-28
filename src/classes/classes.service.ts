import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClassesDocument } from './classes.schema';
import { CreateClassesDto, UpdateClassesDto } from './classes.dto';
import { AuthenticatedRequest } from 'src/auth/auth.guard';
import { MessageInterface } from 'src/common/interfaces';

@Injectable()
export class ClassesService {
  constructor(
    @InjectModel('Classes') private readonly classesModel: Model<ClassesDocument>,
  ) {}

  async createClasses(createClassesDto: CreateClassesDto, req: AuthenticatedRequest): Promise<MessageInterface> {
    try {
      const modified = {...createClassesDto, school: req.user.school}
      const newClass = new this.classesModel(modified);
      await newClass.save();
      return {message: 'Class created successfully'}
    } 
    catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async fetchClasses(req: AuthenticatedRequest): Promise<ClassesDocument[]> {
    try {
      if(req.user)
        return await this.classesModel.find({school: req.user.school})

      return await this.classesModel.find()
    } 
    catch (error) {
      throw new InternalServerErrorException('Failed to fetch classes')
    }
  }

  async fetchClassesById(id: string): Promise<ClassesDocument> {
    try {
      const classItem = await this.classesModel.findById(id);

      if (!classItem)
        throw new NotFoundException(`Class not found`)

      return classItem
    } 
    catch (error) {
      throw new InternalServerErrorException('Failed to fetch class by ID');
    }
  }

  async updateClasses(id: string, updateClassesDto: UpdateClassesDto): Promise<MessageInterface> {
    try {
      const updatedClass = await this.classesModel.findByIdAndUpdate(id, updateClassesDto, { new: true })
      
      if (!updatedClass) 
        throw new NotFoundException(`Class not found`);
      
      return {message: 'Class updated successfully'}
    } 
    catch (error) {
      throw new InternalServerErrorException('Failed to update class');
    }
  }

  async deleteClasses(id: string): Promise<MessageInterface> {
    try {
      const result = await this.classesModel.findByIdAndDelete(id);

      if (!result) 
        throw new NotFoundException(`Class not found`);
    
      return { message: `Class successfully deleted` };
    } 
    catch (error) {
      throw new InternalServerErrorException('Failed to delete class');
    }
  }
}
