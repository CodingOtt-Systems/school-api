import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios'
import { SendOtpDto, VerifyOtpDto } from './msg.dto';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';

const TEN_MINUTE = 600000

@Injectable()
export class MsgService {
    constructor(
        private readonly jwtService: JwtService
    ) {}

    async sendOTP(body: SendOtpDto): Promise<{message: string}> {
        try {
            const {data} = await axios.post(`https://api.msg91.com/api/v5/otp?otp_expiry=10&template_id=${process.env.MSG91_TEMPLATE_OTP}&mobile=${body.mobile}&authkey=${process.env.MSG91_AUTH_KEY}`)
            
            if(data.type !== "success") 
                throw new InternalServerErrorException("Failed to send OTP")

            return {message: 'Otp sent successfully'}
        }
        catch(err)
        {
            throw new InternalServerErrorException(err.message)
        }
    }

    async resendOTP(body: any): Promise<{message: string}> {
        try {
            const {data} = await axios.post(`https://api.msg91.com/api/v5/otp/retry?mobile=${body.mobile}&authkey=${process.env.MSG91_AUTH_KEY}&retrytype=text`)
            
            if(data.type !== "success") 
                throw new InternalServerErrorException("Failed to resend OTP")
            
            return {message: 'Otp sent successfully'}
        }
        catch(err)
        {
            throw new InternalServerErrorException("Failed to resend OTP")
        }
    }

    async verifyOTP(body: any, res: Response): Promise<Response> {
        try {
            const {data} = await axios.post(`https://api.msg91.com/api/v5/otp/verify?mobile=${body.mobile}&authkey=${process.env.MSG91_AUTH_KEY}&otp=${body.otp}`)
            
            if(data.type !== "success") 
                throw new InternalServerErrorException("Failed to verify OTP")
            
            return this.getToken(body, res)
        }
        catch(err)
        {
            throw new InternalServerErrorException("Failed to verify OTP")
        }
    }

    // Helpers
    private async getToken(body: VerifyOtpDto, res: Response) {
        const payload = {
          mobile: body.mobile
        }
    
        const token = await this.jwtService.signAsync(payload, {expiresIn: TEN_MINUTE});
    
    
        res.clearCookie('__OTP');
    
        res.cookie('__OTP', token, {
          domain: process.env.NODE_ENV === 'prod' ? process.env.CLIENT.split('//')[1] : 'localhost',
          httpOnly: true,
          secure: process.env.NODE_ENV === 'prod',
          maxAge: TEN_MINUTE,
          sameSite: process.env.NODE_ENV === 'prod' ? 'none' : null,
        })
    
        return res.json({message: 'Otp verified successfully'});
    }
}