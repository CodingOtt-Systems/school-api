import { IsString, IsOptional, IsNumber, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateExpenseDto {
    @IsNotEmpty()
    @IsString()
    category: string;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNotEmpty()
    @IsNumber()
    amount: number;

    @IsNotEmpty()
    @IsString()
    mode: string;

    @IsNotEmpty()
    @IsDateString()
    expenseDate: string;
}

export class UpdateExpenseDto {
  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsString()
  mode?: string;

  @IsOptional()
  @IsDateString()
  expenseDate?: string;
}
