import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ExpenseDocument = HydratedDocument<Expense>;

@Schema({ timestamps: true })
export class Expense {
    @Prop({ type: mongoose.Types.ObjectId, ref: 'School', required: true })
    school: mongoose.Types.ObjectId;

    @Prop({ required: true, lowercase: true, trim: true })
    category: string;

    @Prop({ required: true, lowercase: true, trim: true })
    title: string;

    @Prop({ required: false, lowercase: true, trim: true })
    description?: string;

    @Prop({ required: true })
    amount: number;

    @Prop({ required: true, lowercase: true, trim: true })
    mode: string;

    @Prop({ required: true })
    expenseDate: string;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
