import { IsString, IsNumber, IsOptional, Min, IsNotEmpty } from 'class-validator';

export class CreateAllowanceDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsNumber()
    amount: number;

    @IsOptional()
    @IsString()
    description?: string;
}

export class UpdateAllowanceDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    amount?: number;

    @IsOptional()
    @IsString()
    description?: string;
}