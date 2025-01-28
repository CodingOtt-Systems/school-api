import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AllowanceDocument } from './allowance.schema';
import { CreateAllowanceDto, UpdateAllowanceDto } from './allowance.dto';
import { AuthenticatedRequest } from 'src/auth/auth.guard';
import { MessageInterface } from 'src/common/interfaces';

@Injectable()
export class AllowanceService {
  constructor(
    @InjectModel('Allowance') private readonly allowanceModel: Model<AllowanceDocument>,
  ) {}

  async createAllowance(createAllowanceDto: CreateAllowanceDto, req: AuthenticatedRequest): Promise<MessageInterface> {
    try {
      const modified = { ...createAllowanceDto, school: req.user.school };
      const newAllowance = new this.allowanceModel(modified);
      await newAllowance.save();
      return { message: 'Allowance created successfully' };
    } 
    catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async fetchAllowances(req: AuthenticatedRequest): Promise<AllowanceDocument[]> {
    try {
        const query = req.user ? {school: req.user.school} : {}
        return await this.allowanceModel.find(query);
    } 
    catch (error) {
      throw new InternalServerErrorException('Failed to fetch allowances');
    }
  }

  async fetchAllowanceById(id: string): Promise<AllowanceDocument> {
    try {
      const allowance = await this.allowanceModel.findById(id);
      if (!allowance) {
        throw new NotFoundException('Allowance not found');
      }
      return allowance;
    } 
    catch (error) {
      throw new InternalServerErrorException('Failed to fetch allowance by ID');
    }
  }

  async updateAllowance(id: string, updateAllowanceDto: UpdateAllowanceDto): Promise<MessageInterface> {
    try {
      const updatedAllowance = await this.allowanceModel.findByIdAndUpdate(id, updateAllowanceDto, { new: true });
      if (!updatedAllowance) {
        throw new NotFoundException('Allowance not found');
      }
      return { message: 'Allowance updated successfully' };
    } 
    catch (error) {
      throw new InternalServerErrorException('Failed to update allowance');
    }
  }

  async deleteAllowance(id: string): Promise<MessageInterface> {
    try {
      const result = await this.allowanceModel.findByIdAndDelete(id);
      if (!result) {
        throw new NotFoundException('Allowance not found');
      }
      return { message: 'Allowance successfully deleted' };
    } 
    catch (error) {
      throw new InternalServerErrorException('Failed to delete allowance');
    }
  }
}
