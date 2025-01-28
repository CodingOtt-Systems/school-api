import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DesignationDocument } from './designation.schema';
import { CreateDesignationDto, UpdateDesignationDto } from './designation.dto';
import { AuthenticatedRequest } from 'src/auth/auth.guard';
import { MessageInterface, PaginationInterface } from 'src/common/interfaces';

@Injectable()
export class DesignationService {
  constructor(
    @InjectModel('Designation') private readonly designationModel: Model<DesignationDocument>,
  ) {}

  async createDesignation(body: CreateDesignationDto,req: AuthenticatedRequest): Promise<MessageInterface> {
    try {
        const modified = {...body, school: req.user.school}
        const newDesignation = new this.designationModel(modified);
        await newDesignation.save();
        return { message: 'Designation created successfully' };
    } 
    catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async fetchDesignations(req: AuthenticatedRequest, page: number, limit: number): Promise<PaginationInterface> {
    try {
        const skip = (page - 1) * limit
        const query = req.user ? {school: req.user.school} : {}

        const [data, total] = await Promise.all([
          this.designationModel.find(query).skip(skip).limit(limit).sort({createdAt: -1}),
          this.designationModel.countDocuments(query)
        ])

        return {data, total}
    } 
    catch (error) {
      throw new InternalServerErrorException('Failed to fetch designations');
    }
  }

  async fetchDesignationById(id: string): Promise<DesignationDocument> {
    try {
      const designation = await this.designationModel.findById(id);

      if (!designation) 
        throw new NotFoundException(`Designation not found`);
      

      return designation;
    } 
    catch (error) {
      throw new InternalServerErrorException('Failed to fetch designation');
    }
  }

  async updateDesignation(id: string,updateDesignationDto: UpdateDesignationDto): Promise<MessageInterface> {
    try {
      const updatedDesignation = await this.designationModel.findByIdAndUpdate(id, updateDesignationDto);

      if (!updatedDesignation) 
        throw new NotFoundException(`Designation not found`);
      

      return { message: 'Designation updated successfully' };
    } 
    catch (error) {
      throw new InternalServerErrorException('Failed to update designation');
    }
  }

  async deleteDesignation(id: string): Promise<MessageInterface> {
    try {
      const result = await this.designationModel.findByIdAndDelete(id);

      if (!result) {
        throw new NotFoundException(`Designation not found`);
      }

      return { message: `Designation successfully deleted` };
    } 
    catch (error) {
      throw new InternalServerErrorException('Failed to delete designation');
    }
  }
}
