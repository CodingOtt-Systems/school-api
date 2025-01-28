import { IsArray, IsDate, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min, ValidateNested } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { AmountStatusEnum } from 'src/common/enums';

export class AllowanceDTO {
  @IsString()
  title: string;

  @Transform(({ value }) => Number(value), { toClassOnly: true })
  @IsNumber()
  @Min(0)
  amount: number; 
}

export class TaxDTO {
  @IsString()
  title: string;

  @Transform(({ value }) => Number(value), { toClassOnly: true })
  @IsNumber()
  @Min(0)
  @Max(100)
  percentage: number;
}

export class CreateSalaryDto {
    @IsNotEmpty()
    @IsMongoId()
    employee: string;

    @IsNotEmpty()
    @Transform(({ value }) => Number(value))
    @IsNumber()
    salary: number;

    @IsNotEmpty()
    @IsString()
    mode: string;

    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    salaryDate: Date;

    @IsOptional()
    @IsString()
    description?: string

    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => AllowanceDTO)
    allowances?: AllowanceDTO[];

    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => TaxDTO)
    taxes?: TaxDTO[];

    @IsEnum(AmountStatusEnum)
    status: AmountStatusEnum;
}

export class UpdateSalaryDto {
    @IsOptional()
    @Transform(({ value }) => Number(value))
    @IsNumber()
    salary?: number;

    @IsOptional()
    @IsString()
    mode?: string;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    salaryDate?: Date;

    @IsOptional()
    @IsString()
    description?: string

    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => AllowanceDTO)
    allowances?: AllowanceDTO[];

    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => TaxDTO)
    taxes?: TaxDTO[];

    @IsEnum(AmountStatusEnum)
    @IsOptional()
    status?: AmountStatusEnum;
}
