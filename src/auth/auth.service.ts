import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth, AuthDocument } from './auth.schema';
import { Model } from 'mongoose';
import { SignupDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';

const EXPIRES = {
    AT: (30 * 24 * 60 * 60) * 1000, // 30 Days in milliseconds
    RT: (30 * 24 * 60 * 60) * 1000 // 30 Days in milliseconds
}

@Injectable()
export class AuthService {
    constructor(
        @InjectModel('Auth') private readonly authModel: Model<AuthDocument>,
        private jwtService: JwtService
    ) {}

    async signup(signupDto: SignupDto) : Promise<AuthDocument>{
        try {
            const user = new this.authModel(signupDto)
            await user.save()
            return user
        }
        catch(error)
        {
            console.log(error)
            throw new InternalServerErrorException(error)
        }
    }

    private async getToken(auth: any, res: Response) {
        const payload = {
          id: auth._id,
          mobile: auth.mobile,
          fullname: auth.fullname,
          email: auth.email,
          country: auth.country,
          fathersName: auth.fathersName,
          mothersName: auth.mothersName,
          dob: auth.dob,
          gender: auth.gender
        };
    
        const accessToken = await this.jwtService.signAsync(payload, { expiresIn: EXPIRES.AT });
        const refreshToken = uuidv4();
    
        auth.refreshToken = refreshToken;
        auth.refreshTokenExpiresAt = new Date(Date.now() + EXPIRES.RT);
        await auth.save();
    
        res.clearCookie('__T');
        res.clearCookie('__R');
    
        res.cookie('__T', accessToken, {
          domain: process.env.NODE_ENV === 'prod' ? process.env.CLIENT.split('//')[1] : 'localhost',
          httpOnly: true,
          secure: process.env.NODE_ENV === 'prod',
          maxAge: EXPIRES.AT,
          sameSite: process.env.NODE_ENV === 'prod' ? 'none' : null,
        });
    
        res.cookie('__R', refreshToken, {
          domain: process.env.NODE_ENV === 'prod' ? process.env.CLIENT.split('//')[1] : 'localhost',
          httpOnly: true,
          secure: process.env.NODE_ENV === 'prod',
          maxAge: EXPIRES.RT,
          sameSite: process.env.NODE_ENV === 'prod' ? 'none' : null,
        });
    
        return res.json(payload);
    }
}
