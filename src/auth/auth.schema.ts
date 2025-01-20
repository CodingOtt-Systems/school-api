import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AuthDocument = HydratedDocument<Auth>;

@Schema({ timestamps: true })
export class Auth {
    @Prop({
        trim: true,
        lowercase: true,
        required: true
    })
    fullname: string;

    @Prop({
        trim: true,
        unique: true,
        index: true,
        required: true
    })
    mobile: string;

    @Prop({
        trim: true,
        unique: true,
        index: true
    })
    refreshToken: string;
    
    @Prop({
        type: Date,
        index: true
    })
    refreshTokenExpiresAt: Date;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
