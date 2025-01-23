import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { MsgService } from './msg.service';
import { SendOtpDto, VerifyOtpDto } from './msg.dto';
import { Response } from 'express';
import { PreventUnwantedOtpGuard } from './msg.guard';

@Controller('msg')
export class MsgController {
    constructor(private readonly msgService: MsgService) {}

    @Post('/send-otp')
    @UseGuards(PreventUnwantedOtpGuard)
    sendOtp(@Body() body: SendOtpDto) {
        return this.msgService.sendOTP(body)
    }

    @Post('/resend-otp')
    @UseGuards(PreventUnwantedOtpGuard)
    resendOtp(@Body() body: SendOtpDto) {
        return this.msgService.resendOTP(body)
    }

    @Post('/verify-otp')
    verifyOtp(@Body() body: VerifyOtpDto, @Res() res: Response) {
        return this.msgService.verifyOTP(body, res)
    }
}
