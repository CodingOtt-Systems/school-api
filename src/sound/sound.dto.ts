import { IsString, IsNotEmpty, IsNumber, IsMongoId, IsOptional } from 'class-validator';

export class CreateSoundDto {
    @IsMongoId()
    @IsNotEmpty()
    user: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsNumber()
    @IsNotEmpty()
    size: number;

    @IsNumber()
    @IsNotEmpty()
    duration: number;

    @IsNotEmpty()
    @IsString()
    path: string;
}

export class UpdateSoundDto {  
    @IsOptional()
    @IsString()
    title?: string;
  
    @IsOptional()
    @IsNumber()
    size?: number;
  
    @IsOptional()
    @IsNumber()
    duration?: number;
}