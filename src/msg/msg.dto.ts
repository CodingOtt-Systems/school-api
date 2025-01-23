import { IsString, IsNotEmpty, IsPhoneNumber, IsOptional, IsIn } from 'class-validator';

export class SendOtpDto {
    @IsNotEmpty()
    @IsString()
    mobile: string;
}

export class ResendOtpDto {
    @IsNotEmpty()
    @IsString()
    mobile: string;
}

export class VerifyOtpDto {
    @IsNotEmpty()
    @IsString()
    mobile: string;

    @IsNotEmpty()
    @IsString()
    otp: string;
}

export class OtpTypeQueryDto {
  @IsNotEmpty()
  @IsString()
  @IsIn(['signup', 'login'], {message: 'Invalid otp type from dto'})
  type: string;
}