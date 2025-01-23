import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type AuthDocument = HydratedDocument<Auth>;

@Schema({ timestamps: true })
export class Auth {
    @Prop({ 
        type: mongoose.Types.ObjectId, 
        ref: 'School', 
        required: true, 
        unique: true, 
        index: true
    })
    school: mongoose.Types.ObjectId;

    @Prop({
        trim: true,
        unique: true,
        index: true,
        required: true
    })
    mobile: string;

    @Prop({
        trim: true
    })
    refreshToken: string;
    
    @Prop({
        type: Date
    })
    refreshTokenExpiresAt: Date;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
