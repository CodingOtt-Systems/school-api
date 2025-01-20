import { IsString, IsNotEmpty, IsPhoneNumber, IsOptional } from 'class-validator';

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
