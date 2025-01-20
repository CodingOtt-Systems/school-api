import { IsString, IsNotEmpty, IsEmail, IsDate, IsEnum, IsNumber, IsOptional, IsMongoId, IsIn } from 'class-validator';

const religions: string[] = [
  'hindu',
  'muslim',
  'christian',
  'sikh',
  'buddhist',
  'jain',
  'other',
];

export class CreateStudentDto {
  @IsMongoId()
  @IsNotEmpty()
  user: string;

  @IsString()
  @IsNotEmpty()
  fullname: string;

  @IsString()
  @IsNotEmpty()
  fathersName: string;

  @IsString()
  @IsOptional()
  mothersName?: string;

  @IsDate()
  @IsNotEmpty()
  dob: Date;

  @IsEnum(['male', 'female', 'other'])
  @IsNotEmpty()
  gender: string;

  @IsIn(religions)
  @IsNotEmpty()
  religion: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  mobile: string;

  @IsString()
  @IsNotEmpty()
  whatsApp: string;

  @IsString()
  @IsOptional()
  previousSchool?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsNumber()
  @IsNotEmpty()
  pincode: number;
}

export class UpdateStudentDto { 
    @IsString()
    @IsOptional()
    fullname?: string;
  
    @IsString()
    @IsOptional()
    fathersName?: string;

    @IsString()
    @IsOptional()
    mothersName?: string;
  
    @IsDate()
    @IsOptional()
    dob?: Date;
  
    @IsEnum(['male', 'female', 'other'])
    @IsOptional()
    gender?: string;
  
    @IsIn(religions)
    @IsOptional()
    religion?: string;
  
    @IsEmail()
    @IsOptional()
    email?: string;
  
    @IsString()
    @IsOptional()
    mobile?: string;
  
    @IsString()
    @IsOptional()
    whatsApp?: string;
  
    @IsString()
    @IsOptional()
    previousSchool?: string;
  
    @IsString()
    @IsOptional()
    address?: string;
  
    @IsString()
    @IsOptional()
    city?: string;
  
    @IsString()
    @IsOptional()
    state?: string;
  
    @IsString()
    @IsOptional()
    country?: string;
  
    @IsNumber()
    @IsOptional()
    pincode?: number;
}