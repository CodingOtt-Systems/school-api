import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type TeacherDocument = HydratedDocument<Teacher>;

@Schema({ timestamps: true })
export class Teacher {
  @Prop({ type: mongoose.Types.ObjectId, ref: 'Auth', required: true })
  user: mongoose.Types.ObjectId;

  @Prop({ type: String, required: false })
  image?: string;

  @Prop({ type: String, required: true, trim: true })
  fullname: string;

  @Prop({ type: String, required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ type: String, required: true, unique: true, trim: true })
  mobile: string;

  @Prop({ type: [String], required: true, lowercase: true, trim: true })
  subjects: string[];

  @Prop({ type: String, required: true, trim: true })
  address: string;

  @Prop({ type: String, required: true, trim: true })
  city: string;

  @Prop({ type: String, required: true, trim: true })
  state: string;

  @Prop({ type: String, required: true, trim: true })
  country: string;

  @Prop({ type: Number, required: true })
  pincode: number;
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
