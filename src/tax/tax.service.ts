import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaxDocument } from './tax.schema';
import { CreateTaxDto, UpdateTaxDto } from './tax.dto';
import { AuthenticatedRequest } from 'src/auth/auth.guard';
import { MessageInterface } from 'src/common/interfaces';

@Injectable()
export class TaxService {
  constructor(
    @InjectModel('Tax') private readonly taxModel: Model<TaxDocument>,
  ) {}

  async createTax(createTaxDto: CreateTaxDto, req: AuthenticatedRequest): Promise<MessageInterface> {
    try {
      const modified = { ...createTaxDto, school: req.user.school };
      const newTax = new this.taxModel(modified);
      await newTax.save();
      return { message: 'Tax created successfully' };
    } 
    catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async fetchTaxes(req: AuthenticatedRequest): Promise<TaxDocument[]> {
    try {
        const query = req.user ? {school: req.user.school} : {}
        return await this.taxModel.find(query).sort({createdAt: -1});
    } 
    catch (error) {
      throw new InternalServerErrorException('Failed to fetch taxes');
    }
  }

  async fetchTaxById(id: string): Promise<TaxDocument> {
    try {
      const tax = await this.taxModel.findById(id);

      if (!tax) {
        throw new NotFoundException('Tax not found');
      }

      return tax;
    } 
    catch (error) {
      throw new InternalServerErrorException('Failed to fetch tax by ID');
    }
  }

  async updateTax(id: string, updateTaxDto: UpdateTaxDto): Promise<MessageInterface> {
    try {
      const updatedTax = await this.taxModel.findByIdAndUpdate(id, updateTaxDto, { new: true });

      if (!updatedTax) {
        throw new NotFoundException('Tax not found');
      }

      return { message: 'Tax updated successfully' };
    } 
    catch (error) {
      throw new InternalServerErrorException('Failed to update tax');
    }
  }

  async deleteTax(id: string): Promise<MessageInterface> {
    try {
      const result = await this.taxModel.findByIdAndDelete(id);

      if (!result) {
        throw new NotFoundException('Tax not found');
      }

      return { message: 'Tax successfully deleted' };
    } 
    catch (error) {
      throw new InternalServerErrorException('Failed to delete tax');
    }
  }
}
