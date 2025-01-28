import { IsOptional, IsString, IsEmail, IsDateString, IsNotEmpty, IsNumber, ValidateIf, IsIn } from 'class-validator';
import { PaginationDto } from 'src/common/dto';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  fullname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  mobile: string;

  @IsNotEmpty()
  @IsDateString()
  dob: string;

  @IsNotEmpty()
  @IsDateString()
  joiningDate: string;

  @IsNotEmpty()
  @IsString()
  gender: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsNumber()
  pincode: string;

  @IsNotEmpty()
  @IsString()
  designation: string;

  @IsNotEmpty()
  @IsNumber()
  salary: number;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  image?: string;
}

export class UpdateEmployeeDto {
    @IsOptional()
    @IsString()
    fullname?: string;
  
    @IsOptional()
    @IsEmail()
    email?: string;
  
    @IsOptional()
    @IsString()
    mobile?: string;
  
    @IsOptional()
    @IsDateString()
    dob?: string;

    @IsOptional()
    @IsDateString()
    joiningDate?: string;
  
    @IsOptional()
    @IsString()
    gender?: string;
  
    @IsOptional()
    @IsString()
    address?: string;
  
    @IsOptional()
    @IsString()
    city?: string;
  
    @IsOptional()
    @IsString()
    state?: string;
  
    @IsOptional()
    @IsString()
    country?: string;
  
    @IsOptional()
    @IsNumber()
    pincode?: string;
  
    @IsOptional()
    @IsString()
    designation?: string;

    @IsOptional()
    @IsNumber()
    salary?: number;
  
    @IsOptional()
    @IsString()
    status?: string;

    @IsOptional()
    @IsString()
    image?: string;
  }

export class FetchEmployeeQueryDto extends PaginationDto {
  @IsOptional()
  @IsString()
  @IsIn(['search'], { message: 'type must be "search"' })
  type?: 'search';

  @ValidateIf((dto) => dto.type === 'search')
  @IsString({ message: 'key is required when type is "search"' })
  @IsIn(['fullname', 'email', 'empId'], {
    message: 'key must be "fullname", "email", or "empId"',
  })
  key?: 'fullname' | 'email' | 'empId';

  @ValidateIf((dto) => dto.type === 'search')
  @IsString({ message: 'value is required when type is "search"' })
  value?: string;
}