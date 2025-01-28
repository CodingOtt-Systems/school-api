import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ClassesDocument = HydratedDocument<Classes>;

@Schema({ timestamps: true })
export class Classes {
  @Prop({ type: mongoose.Types.ObjectId, ref: 'School', required: true })
  school: mongoose.Types.ObjectId;

  @Prop({ required: true, lowercase: true, trim: true })
  title: string;

  @Prop({ type: [String], required: true, lowercase: true, trim: true })
  sections: string[];

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Teacher' })
  classTeacher: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Subject', required: true})
  subjects: mongoose.Types.ObjectId[];
}

export const ClassesSchema = SchemaFactory.createForClass(Classes);
