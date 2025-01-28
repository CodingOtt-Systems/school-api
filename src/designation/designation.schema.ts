import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type DesignationDocument = HydratedDocument<Designation>;

@Schema({ timestamps: true })
export class Designation {
    @Prop({ type: mongoose.Types.ObjectId, ref: 'School', required: true })
    school: mongoose.Types.ObjectId;

    @Prop({ required: true, type: String, lowercase: true, trim: true })
    title: string;

    @Prop({ type: String, lowercase: true, trim: true, default: "my description is missing", maxlength: 100})
    description?: string;

    @Prop({ required: true, type: Number })
    salary: number;
}

export const DesignationSchema = SchemaFactory.createForClass(Designation);
