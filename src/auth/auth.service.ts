import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth, AuthDocument } from './auth.schema';
import { Model } from 'mongoose';
import { SignupDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';
import { AuthenticatedRequest } from './auth.guard';

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

    async signup(signupDto: SignupDto, res: Response) : Promise<Response>{
        try {
            const auth = new this.authModel(signupDto)
            await auth.save()
            return this.getToken(auth, res)
        }
        catch(error)
        {
          if (error.code === 11000) {
            throw new ConflictException('User with this mobile already exists');
          }

          throw new InternalServerErrorException(error)
        }
    }

    async logout(req: Request, res: Response): Promise<Response> {
        try {      
          res.clearCookie('__OTT_AT', {
            domain: process.env.NODE_ENV === 'prod' ? process.env.CLIENT.split('//')[1] : 'localhost',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'prod',
            sameSite: process.env.NODE_ENV === 'prod' ? 'none' : null,
          });
    
          res.clearCookie('__OTT_RT', {
            domain: process.env.NODE_ENV === 'prod' ? process.env.CLIENT.split('//')[1] : 'localhost',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'prod',
            sameSite: process.env.NODE_ENV === 'prod' ? 'none' : null,
          });
    
          return res.json({ success: true });
        } 
        catch (err) 
        {
          throw new InternalServerErrorException('Error while logging out');
        }
    }

    async refresh(req: Request, res: Response): Promise<Response> {
        try {
          const auth = await this.authModel.findOne({refreshToken: req.cookies['__OTT_RT']});
    
          if (!auth || new Date() > auth.refreshTokenExpiresAt) {
            throw new UnauthorizedException('Invalid refresh token');
          }
    
          return this.getToken(auth, res);
        } 
        catch (err) 
        {
          throw new UnauthorizedException('Invalid refresh token');
        }
    }

    async fetchSession(req: AuthenticatedRequest): Promise<AuthenticatedRequest> {
        try {
          return req.user
        }
        catch(err)
        {
          throw new UnauthorizedException('Invalid refresh token');
        }
    }

    // Helpers

    private async getToken(auth: AuthDocument, res: Response) {
        const payload = {
          id: auth._id,
          mobile: auth.mobile,
          fullname: auth.fullname
        }
    
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
