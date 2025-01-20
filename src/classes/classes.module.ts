import { Module } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Classes, ClassesSchema } from './classes.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Classes.name, schema: ClassesSchema }])],
  providers: [ClassesService],
  controllers: [ClassesController]
})
export class ClassesModule {}
