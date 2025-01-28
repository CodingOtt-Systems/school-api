import { Module } from '@nestjs/common';
import { SalaryService } from './salary.service';
import { SalaryController } from './salary.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Salary, SalarySchema } from './salary.schema';

@Module({
  imports: [
      MongooseModule.forFeature([{name: Salary.name, schema: SalarySchema }])
  ],
  providers: [SalaryService],
  controllers: [SalaryController]
})
export class SalaryModule {}
