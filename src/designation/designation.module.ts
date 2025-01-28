import { Module } from '@nestjs/common';
import { DesignationService } from './designation.service';
import { DesignationController } from './designation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Designation, DesignationSchema } from './designation.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Designation.name, schema: DesignationSchema }])],
  providers: [DesignationService],
  controllers: [DesignationController]
})
export class DesignationModule {}
