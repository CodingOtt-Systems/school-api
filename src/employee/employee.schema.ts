import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import * as shortid from 'shortid';
import { EmployeeStatusEnum, GenderEnum } from 'src/common/enums';
export type EmployeeDocument = HydratedDocument<Employee>;

@Schema({ timestamps: true })
export class Employee {
    @Prop({ type: mongoose.Types.ObjectId, ref: 'School', required: true })
    school: mongoose.Types.ObjectId;

    @Prop({ trim: true, uppercase: true, unique: true, index: true, default: shortid.generate })
    empId: string;

    @Prop({ required: true, trim: true, lowercase: true })
    fullname: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true, unique: true })
    mobile: string;

    @Prop({ required: true, type: Date })
    dob: Date;

    @Prop({ required: true, type: Date })
    joiningDate: Date;

    @Prop({ required: true, trim: true, lowercase: true, enum: GenderEnum })
    gender: GenderEnum;

    @Prop({ required: true, trim: true, lowercase: true })
    address: string;

    @Prop({ required: true, trim: true, lowercase: true })
    city: string;

    @Prop({ required: true, trim: true, lowercase: true })
    state: string;

    @Prop({ required: true, trim: true, lowercase: true })
    country: string;

    @Prop({ required: true })
    pincode: number;

    @Prop({ required: true, trim: true, lowercase: true })
    designation: string;

    @Prop({ required: true })
    salary: number;

    @Prop()
    image: string;

    @Prop({ required: true, enum: EmployeeStatusEnum, default: EmployeeStatusEnum.active })
    status: EmployeeStatusEnum;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
