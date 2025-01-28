import { IsNotEmpty, IsOptional, IsString, IsArray, ArrayNotEmpty, IsMongoId } from "class-validator";
import mongoose from "mongoose";

export class CreateClassesDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    sections: string[];

    @IsOptional()
    @IsMongoId()
    classTeacher?: mongoose.Types.ObjectId;

    @IsNotEmpty()
    @IsArray()
    @ArrayNotEmpty()
    @IsMongoId({ each: true })
    subjects: mongoose.Types.ObjectId[];
}

export class UpdateClassesDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    sections?: string[];

    @IsOptional()
    @IsMongoId()
    classTeacher?: mongoose.Types.ObjectId;

    @IsOptional()
    @IsArray()
    @IsMongoId({ each: true })
    subjects?: mongoose.Types.ObjectId[];
}
