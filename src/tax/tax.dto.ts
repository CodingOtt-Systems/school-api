import { IsNotEmpty, IsString, IsNumber, Min, Max, IsOptional } from 'class-validator';

export class CreateTaxDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsNumber()
    @Min(0)
    @Max(100)
    percentage: number;

    @IsOptional()
    @IsString()
    description?: string;
}   

export class UpdateTaxDto {
    @IsOptional()
    @IsString()
    name?: string;
  
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(100)
    percentage?: number;
  
    @IsOptional()
    @IsString()
    description?: string;
}
