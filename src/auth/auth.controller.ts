import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto, LoginDto } from './auth.dto';
import { Response } from 'express';
import { OtpVerifiedGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/signup')
    @UseGuards(OtpVerifiedGuard)
    signup(@Body() body: SignupDto, @Res() res: Response) {
        return this.authService.signup(body, res)
    }

    @Post('/login')
    @UseGuards(OtpVerifiedGuard)
    login(@Body() body: LoginDto, @Res() res: Response) {
        return this.authService.login(body, res)
    }
}
