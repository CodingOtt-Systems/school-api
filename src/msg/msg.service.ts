import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios'

@Injectable()
export class MsgService {
    async sendOTP(body: any): Promise<{message: string}> {
        try {
            const {data} = await axios.post(`https://api.msg91.com/api/v5/otp?otp_expiry=10&template_id=${process.env.MSG91_TEMPLATE_OTP}&mobile=${body.mobile}&authkey=${process.env.MSG91_AUTH_KEY}`)
            
            if(data.type !== "success") 
                throw new InternalServerErrorException("Failed to send OTP")

            return {message: 'Otp sent successfully'}
        }
        catch(err)
        {
            throw new InternalServerErrorException(err)
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

    async verifyOTP(body: any): Promise<{message: string}> {
        try {
            const {data} = await axios.post(`https://api.msg91.com/api/v5/otp/verify?mobile=${body.mobile}&authkey=${process.env.MSG91_AUTH_KEY}&otp=${body.otp}`)
            
            if(data.type !== "success") 
                throw new InternalServerErrorException("Failed to verify OTP")
            
            return {message: 'Otp verified successfully'}
        }
        catch(err)
        {
            throw new InternalServerErrorException("Failed to verify OTP")
        }
    }
}