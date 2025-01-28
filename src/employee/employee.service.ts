import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmployeeDocument } from './employee.schema';
import { CreateEmployeeDto, FetchEmployeeQueryDto, UpdateEmployeeDto } from './employee.dto';
import { AuthenticatedRequest } from 'src/auth/auth.guard';
import { MessageInterface, PaginationInterface } from 'src/common/interfaces';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel('Employee') private readonly employeeModel: Model<EmployeeDocument>,
  ) {}

  async createEmployee(body: CreateEmployeeDto, req: AuthenticatedRequest): Promise<MessageInterface> {
    try {
      const modified = { ...body, school: req.user.school };
      const newEmployee = new this.employeeModel(modified);
      await newEmployee.save();
      return { message: 'Employee created successfully' };
    } 
    catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async fetchEmployees(req: AuthenticatedRequest, q: FetchEmployeeQueryDto): Promise<PaginationInterface> {
    try {
      const skip = (q.page - 1) * q.limit
      const query = this.getQuery(req, q)

      const [data, total] = await Promise.all([
        this.employeeModel.find(query).skip(skip).limit(q.limit).sort({createdAt: -1}),
        this.employeeModel.countDocuments(query)
      ])

      return {data, total}
    } 
    catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Failed to fetch employees');
    }
  }

  async fetchEmployeeById(id: string): Promise<EmployeeDocument> {
    try {
      const employee = await this.employeeModel.findById(id);

      if (!employee) 
        throw new NotFoundException(`Employee not found`);
      

      return employee;
    } 
    catch (error) {
      throw new InternalServerErrorException('Failed to fetch employee');
    }
  }

  async updateEmployee(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<MessageInterface> {
    try {
      const updatedEmployee = await this.employeeModel.findByIdAndUpdate(id, updateEmployeeDto, { new: true });

      if (!updatedEmployee) 
        throw new NotFoundException(`Employee not found`);
      

      return { message: 'Employee updated successfully' };
    } 
    catch (error) {
      throw new InternalServerErrorException('Failed to update employee');
    }
  }

  async deleteEmployee(id: string): Promise<MessageInterface> {
    try {
      const result = await this.employeeModel.findByIdAndDelete(id);

      if (!result) 
        throw new NotFoundException(`Employee not found`);
      

      return { message: `Employee successfully deleted` };
    } 
    catch (error) {
      throw new InternalServerErrorException('Failed to delete employee');
    }
  }

  // Helpers
  private getQuery(req: AuthenticatedRequest, q: FetchEmployeeQueryDto) {
    let query = req.user ? {school: req.user.school} : {}
    
    if(q.type === "search")
      query = {
        ...query,
        [q.key]: {$regex: q.value, $options: 'i'}
      }

    return query
  }
}
