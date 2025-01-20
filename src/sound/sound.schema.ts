import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type SoundDocument = HydratedDocument<Sound>;

@Schema({ timestamps: true })
export class Sound {
    @Prop({ type: mongoose.Types.ObjectId, ref: 'Auth', required: true })
    user: mongoose.Types.ObjectId;

    @Prop({ required: true, lowercase: true, trim: true })
    title: string;

    @Prop({ required: true })
    size: number;

    @Prop({ required: true })
    duration: number;

    @Prop({ required: true, trim: true })
    path: string;
}

export const SoundSchema = SchemaFactory.createForClass(Sound);
