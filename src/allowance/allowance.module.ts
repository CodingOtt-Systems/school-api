import { Module } from '@nestjs/common';
import { AllowanceService } from './allowance.service';
import { AllowanceController } from './allowance.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Allowance, AllowanceSchema } from './allowance.schema';

@Module({
  imports: [MongooseModule.forFeature([{
    name: Allowance.name,
    schema: AllowanceSchema
  }])],
  providers: [AllowanceService],
  controllers: [AllowanceController]
})
export class AllowanceModule {}
