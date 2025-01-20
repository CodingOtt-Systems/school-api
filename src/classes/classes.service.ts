import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClassesDocument } from './classes.schema';
import { CreateClassesDto, UpdateClassesDto } from './classes.dto';

@Injectable()
export class ClassesService {
  constructor(
    @InjectModel('Classes') private readonly classesModel: Model<ClassesDocument>,
  ) {}

  async createClasses(createClassesDto: CreateClassesDto): Promise<ClassesDocument> {
    try {
      const newClass = new this.classesModel(createClassesDto);
      return await newClass.save();
    } 
    catch (error) {
      throw new InternalServerErrorException('Failed to create class');
    }
  }

  async fetchClasses(): Promise<ClassesDocument[]> {
    try {
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

  async updateClasses(id: string, updateClassesDto: UpdateClassesDto): Promise<ClassesDocument> {
    try {
      const updatedClass = await this.classesModel.findByIdAndUpdate(id, updateClassesDto, { new: true })
      
      if (!updatedClass) 
        throw new NotFoundException(`Class not found`);
      
      return updatedClass;
    } 
    catch (error) {
      throw new InternalServerErrorException('Failed to update class');
    }
  }

  async deleteClasses(id: string): Promise<{ message: string }> {
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
