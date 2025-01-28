import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type AllowanceDocument = HydratedDocument<Allowance>;

@Schema({ timestamps: true })
export class Allowance {
  @Prop({ type: mongoose.Types.ObjectId, ref: 'School', required: true })
  school: mongoose.Types.ObjectId;

  @Prop({ required: true, lowercase: true, trim: true })
  title: string;

  @Prop({ lowercase: true, trim: true, default: 'my description is missing'})
  description: string;

  @Prop({ required: true })
  amount: number;
}

export const AllowanceSchema = SchemaFactory.createForClass(Allowance);
