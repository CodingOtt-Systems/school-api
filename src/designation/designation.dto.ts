import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateDesignationDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsNumber()
  salary: number;
}

export class UpdateDesignationDto {
    @IsOptional()
    @IsString()
    title?: string;
  
    @IsOptional()
    @IsString()
    description?: string;
  
    @IsOptional()
    @IsNumber()
    salary?: number;
  }