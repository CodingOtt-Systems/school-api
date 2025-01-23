import { IsString, IsEmail, IsOptional, IsDateString, Length, IsNotEmpty, IsNumber, IsIn } from 'class-validator';

export class SignupDto {
    @IsNotEmpty()
    @IsString()
    director: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    mobile: string;

    @IsOptional()
    @IsString()
    refreshToken?: string;

    @IsOptional()
    @IsDateString()
    refreshTokenExpiresAt?: Date;
}

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  mobile: string;
}