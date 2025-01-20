import { IsString, IsEmail, IsOptional, IsDateString, Length, IsNotEmpty } from 'class-validator';

export class SignupDto {
    @IsNotEmpty()
    @IsString()
    fullname: string;

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

export class UpdateAuthDto {
  @IsOptional()
  @IsString()
  fullname?: string;

  @IsOptional()
  @IsString()
  mobile?: string;

  @IsOptional()
  @IsString()
  refreshToken?: string;

  @IsOptional()
  @IsDateString()
  refreshTokenExpiresAt?: Date;
}
