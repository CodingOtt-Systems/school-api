import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ClassesDocument = HydratedDocument<Classes>;

@Schema({ timestamps: true })
export class Classes {
  @Prop({ type: mongoose.Types.ObjectId, ref: 'Auth', required: true })
  user: mongoose.Types.ObjectId;

  @Prop({ required: true, lowercase: true, trim: true })
  title: string;

  @Prop({ type: [String], required: true, lowercase: true, trim: true })
  sections: string[];
}

export const ClassesSchema = SchemaFactory.createForClass(Classes);
