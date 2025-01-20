import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type SchoolDocument = HydratedDocument<School>;

@Schema({ timestamps: true })
export class School {
    @Prop({ type: mongoose.Types.ObjectId, ref: 'Auth', required: true })
    user: mongoose.Types.ObjectId;

    @Prop({ type: String, trim: true, lowercase: true })
    regNo: string;

    @Prop({ type: String, trim: true, lowercase: true })
    logo: string;

    @Prop({ type: String, trim: true, lowercase: true, required: true })
    title: string;

    @Prop({ type: String, trim: true, lowercase: true })
    description: string;

    @Prop({ type: String, trim: true, lowercase: true, required: true })
    director: string;

    @Prop({ type: String, trim: true, required: true })
    mobile: string;

    @Prop({ type: String, trim: true, required: true })
    email: string;

    @Prop({ type: String, trim: true, lowercase: true, required: true })
    address: string;

    @Prop({ type: String, trim: true, lowercase: true, required: true })
    city: string;

    @Prop({ type: String, trim: true, lowercase: true, required: true })
    state: string;

    @Prop({ type: String, trim: true, lowercase: true, required: true })
    country: string;

    @Prop({ type: Number, required: true })
    pincode: number;
}

export const SchoolSchema = SchemaFactory.createForClass(School);
