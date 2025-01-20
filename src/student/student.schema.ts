import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type StudentDocument = HydratedDocument<Student>;

const religions: string[] = [
    'hindu',
    'muslim',
    'christian',
    'sikh',
    'buddhist',
    'jain',
    'other',
]

@Schema({ timestamps: true })
export class Student {
  @Prop({ type: mongoose.Types.ObjectId, ref: 'Auth', required: true })
  user: mongoose.Types.ObjectId;

  @Prop({ required: true, lowercase: true, trim: true })
  fullname: string;

  @Prop({ required: true, lowercase: true, trim: true })
  fathersName: string;

  @Prop({ lowercase: true, trim: true })
  mothersName: string;

  @Prop({ type: Date, required: true })
  dob: Date;

  @Prop({ required: true, enum: ['male', 'female', 'other'], lowercase: true, trim: true })
  gender: string;

  @Prop({ required: true, trim: true, lowercase: true, enum: religions })
  religion: string;

  @Prop({ required: true, trim: true })
  email: string;

  @Prop({ required: true, trim: true })
  mobile: string;

  @Prop({ trim: true, required: true })
  whatsApp: string;

  @Prop({ trim: true })
  previousSchool: string;

  @Prop({ trim: true, lowercase: true })
  address: string;

  @Prop({ required: true, trim: true, lowercase: true })
  city: string;

  @Prop({ required: true, trim: true, lowercase: true })
  state: string;

  @Prop({ required: true, trim: true, lowercase: true })
  country: string;

  @Prop({ required: true })
  pincode: number;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
