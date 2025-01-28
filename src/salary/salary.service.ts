import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SalaryDocument } from './salary.schema';
import { CreateSalaryDto, UpdateSalaryDto } from './salary.dto';
import { AuthenticatedRequest } from 'src/auth/auth.guard';
import { MessageInterface, PaginationInterface } from 'src/common/interfaces';

@Injectable()
export class SalaryService {
  constructor(
    @InjectModel('Salary') private readonly salaryModel: Model<SalaryDocument>,
  ) {}

  async createSalary(createSalaryDto: CreateSalaryDto, req: AuthenticatedRequest): Promise<MessageInterface> {
    try {
      const modified = { ...createSalaryDto, school: req.user.school };
      const newSalary = new this.salaryModel(modified);
      await newSalary.save();
      return { message: 'Salary created successfully' };
    } 
    catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async fetchSalaries(req: AuthenticatedRequest, page: number, limit: number): Promise<PaginationInterface> {
    try {
        const skip = (page - 1) * limit
        const query = req.user ? {school: req.user.school} : {}
  
        const [data, total] = await Promise.all([
          this.salaryModel.find(query).skip(skip).limit(limit).sort({createdAt: -1}).populate('employee'),
          this.salaryModel.countDocuments(query)
        ])
  
        return {data, total}
    } 
    catch (error) {
      throw new InternalServerErrorException('Failed to fetch salaries');
    }
  }

  async fetchSalaryById(id: string): Promise<SalaryDocument> {
    try {
      const salaryItem = await this.salaryModel.findById(id);

      if (!salaryItem) {
        throw new NotFoundException('Salary not found');
      }

      return salaryItem;
    } 
    catch (error) {
      throw new InternalServerErrorException('Failed to fetch salary by ID');
    }
  }

  async updateSalary(id: string, updateSalaryDto: UpdateSalaryDto): Promise<MessageInterface> {
    try {
      const updatedSalary = await this.salaryModel.findByIdAndUpdate(id, updateSalaryDto, { new: true });

      if (!updatedSalary) {
        throw new NotFoundException('Salary not found');
      }

      return { message: 'Salary updated successfully' };
    } 
    catch (error) {
      throw new InternalServerErrorException('Failed to update salary');
    }
  }

  async deleteSalary(id: string): Promise<MessageInterface> {
    try {
      const result = await this.salaryModel.findByIdAndDelete(id);

      if (!result) {
        throw new NotFoundException('Salary not found');
      }

      return { message: 'Salary successfully deleted' };
    } 
    catch (error) {
      throw new InternalServerErrorException('Failed to delete salary');
    }
  }
}
