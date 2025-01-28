import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExpenseDocument } from './expense.schema';
import { CreateExpenseDto, UpdateExpenseDto } from './expense.dto';
import { AuthenticatedRequest } from 'src/auth/auth.guard';
import { MessageInterface, PaginationInterface } from 'src/common/interfaces';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectModel('Expense') private readonly expenseModel: Model<ExpenseDocument>,
  ) {}

  async createExpense(createExpenseDto: CreateExpenseDto, req: AuthenticatedRequest): Promise<MessageInterface> {
    try {
      const modified = { ...createExpenseDto, school: req.user.school };
      const newExpense = new this.expenseModel(modified);
      await newExpense.save();
      return { message: 'Expense created successfully' };
    } 
    catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async fetchExpenses(req: AuthenticatedRequest, page: number, limit: number): Promise<PaginationInterface> {
    try {
      const skip = (page - 1) * limit
      const query = req.user ? {school: req.user.school} : {}

      const [data, total] = await Promise.all([
        this.expenseModel.find(query).skip(skip).limit(limit).sort({createdAt: -1}),
        this.expenseModel.countDocuments(query)
      ])

      return {data, total}
    } 
    catch (error) {
      throw new InternalServerErrorException('Failed to fetch expenses');
    }
  }

  async fetchExpenseById(id: string): Promise<ExpenseDocument> {
    try {
      const expense = await this.expenseModel.findById(id);

      if (!expense) throw new NotFoundException('Expense not found');

      return expense;
    } 
    catch (error) {
      throw new InternalServerErrorException('Failed to fetch expense by ID');
    }
  }

  async updateExpense(id: string, updateExpenseDto: UpdateExpenseDto): Promise<MessageInterface> {
    try {
      const updatedExpense = await this.expenseModel.findByIdAndUpdate(id, updateExpenseDto, { new: true });

      if (!updatedExpense) throw new NotFoundException('Expense not found');

      return { message: 'Expense updated successfully' };
    } 
    catch (error) {
      throw new InternalServerErrorException('Failed to update expense');
    }
  }

  async deleteExpense(id: string): Promise<MessageInterface> {
    try {
      const result = await this.expenseModel.findByIdAndDelete(id);

      if (!result) throw new NotFoundException('Expense not found');

      return { message: 'Expense successfully deleted' };
    } 
    catch (error) {
      throw new InternalServerErrorException('Failed to delete expense');
    }
  }
}
