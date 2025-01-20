import { Controller, Post, Body } from '@nestjs/common';
import { MsgService } from './msg.service';
import { ResendOtpDto, SendOtpDto, VerifyOtpDto } from './msg.dto';

@Controller('msg')
export class MsgController {
  constructor(private readonly msgService: MsgService) {}

  @Post('send-otp')
  sendOtp(@Body() sendOtpDto: SendOtpDto) {
    return this.msgService.sendOTP(sendOtpDto);
  }

  @Post('resend-otp')
  resendOtp(@Body() resendOtpDto: ResendOtpDto) {
    return this.msgService.resendOTP(resendOtpDto);
  }

  @Post('verify-otp')
  verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.msgService.verifyOTP(verifyOtpDto);
  }
}
