import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type TaxDocument = HydratedDocument<Tax>;

@Schema({ timestamps: true })
export class Tax {
  @Prop({ type: mongoose.Types.ObjectId, ref: 'School', required: true })
  school: mongoose.Types.ObjectId;

  @Prop({ required: true, lowercase: true, trim: true })
  title: string;

  @Prop({ lowercase: true, trim: true, default: 'my description is missing'})
  description: string;

  @Prop({ required: true })
  percentage: number;
}

export const TaxSchema = SchemaFactory.createForClass(Tax);
