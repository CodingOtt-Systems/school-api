import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SchoolDocument = HydratedDocument<School>;

@Schema({ timestamps: true })
export class School {
    @Prop({ type: String, trim: true })
    regNo: string;

    @Prop({ type: String, trim: true, lowercase: true })
    logo: string;

    @Prop({ type: String, trim: true, lowercase: true, required: true })
    name: string;

    @Prop({ type: String, trim: true, lowercase: true })
    description: string;

    @Prop({ type: String, trim: true, lowercase: true, required: true })
    director: string;

    @Prop({ type: String, trim: true, required: true })
    mobile: string;

    @Prop({ type: String, trim: true })
    whatsApp: string;

    @Prop({ type: String, trim: true })
    email: string;

    @Prop({ type: String, trim: true })
    website: string;

    @Prop({ type: String, trim: true, lowercase: true })
    address: string;

    @Prop({ type: String, trim: true, lowercase: true })
    city: string;

    @Prop({ type: String, trim: true, lowercase: true })
    state: string;

    @Prop({ type: String, trim: true, lowercase: true })
    country: string;

    @Prop({ type: Number })
    pincode: number;
}

export const SchoolSchema = SchemaFactory.createForClass(School);
