import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { School, SchoolDocument } from './school.schema';
import { CreateSchoolDto, UpdateSchoolDto } from './school.dto';
import { AuthenticatedRequest } from 'src/auth/auth.guard';

@Injectable()
export class SchoolService {
  constructor(
    @InjectModel(School.name) private readonly schoolModel: Model<SchoolDocument>,
  ) {}

  async createSchool(createSchoolDto: CreateSchoolDto): Promise<SchoolDocument> {
    try {
      const newSchool = new this.schoolModel(createSchoolDto);
      return await newSchool.save()
    } 
    catch (error) {     
      if (error.code === 11000) {
        throw new ConflictException('School already exists with this acount');
      }

      throw new InternalServerErrorException('Failed to create school');
    }
  }

  async fetchSchools(page: number, limit: number, req: AuthenticatedRequest): Promise<SchoolDocument | {data: SchoolDocument[], total: number}> {
    try {
      if(req.user)
        return await this.schoolModel.findOne({user: req.user.id}).sort({createdAt: -1})

      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.schoolModel.find().skip(skip).limit(limit),
        this.schoolModel.countDocuments(),
      ]);

      return { data, total };
    } 
    catch (error) {
      throw new InternalServerErrorException('Failed to fetch schools');
    }
  }

  async fetchSchoolById(id: string): Promise<School> {
    try {
      const school = await this.schoolModel.findById(id);

      if (!school) 
        throw new NotFoundException(`School not found`);
      
      return school;
    } 
    catch (error) {
      throw new InternalServerErrorException('Failed to fetch school');
    }
  }

  async updateSchool(id: string, updateData: UpdateSchoolDto): Promise<SchoolDocument> {
    try {
      const updatedSchool = await this.schoolModel.findByIdAndUpdate(id, updateData, { new: true })
      
      if (!updatedSchool) 
        throw new NotFoundException(`School not found`);
      
      return updatedSchool;
    } 
    catch (error) {
      throw new InternalServerErrorException('Failed to update school');
    }
  }

  async deleteSchool(id: string): Promise<{message: string}> {
    try {
      const deletedSchool = await this.schoolModel.findByIdAndDelete(id);

      if (!deletedSchool)
        throw new NotFoundException(`School with ID ${id} not found`);
      

      return { message: `Class successfully deleted` }
    } 
    catch (error) {
      throw new InternalServerErrorException('Failed to delete school');
    }
  }
}
