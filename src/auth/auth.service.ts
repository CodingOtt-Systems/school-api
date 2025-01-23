import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthDocument } from './auth.schema';
import mongoose, { Model } from 'mongoose';
import { LoginDto, SignupDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';
import { AuthenticatedRequest } from './auth.guard';
import { SchoolService } from 'src/school/school.service';

const EXPIRES = {
    AT: (30 * 24 * 60 * 60) * 1000, // 30 Days in milliseconds
    RT: (30 * 24 * 60 * 60) * 1000 // 30 Days in milliseconds
}

@Injectable()
export class AuthService {
    constructor(
        @InjectModel('Auth') private readonly authModel: Model<AuthDocument>,
        private jwtService: JwtService,
        private readonly schoolService: SchoolService
    ) {}

    async signup(body: SignupDto, res: Response) : Promise<Response>{
        try {
            const school = await this.schoolService.createSchool(body)
            const auth = new this.authModel({mobile: body.mobile, school: school._id})
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

    async login(body: LoginDto, res: Response) : Promise<Response>{
      try {
        const auth = await this.authModel.findOne({mobile: body.mobile})
        if(!auth)
          throw new NotFoundException("User doesn`t exist please signup to continue")

        return this.getToken(auth, res)
      }
      catch(error)
      {
        throw new InternalServerErrorException(error.message)
      }
  }

    async logout(req: Request, res: Response): Promise<Response> {
        try {      
          res.clearCookie('__T', {
            domain: process.env.NODE_ENV === 'prod' ? process.env.CLIENT.split('//')[1] : 'localhost',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'prod',
            sameSite: process.env.NODE_ENV === 'prod' ? 'none' : null,
          });
    
          res.clearCookie('__R', {
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
    async isUserExist(mobile: string): Promise<Boolean> {
      try {
        const count = await this.authModel.countDocuments({mobile})
        return count > 0
      }
      catch(err)
      {
        return false
      }
    }

    private async getToken(auth: AuthDocument, res: Response) {
        const payload = {
          id: auth._id,
          mobile: auth.mobile,
          school: auth.school
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

    async addSchool(schoolId: mongoose.Types.ObjectId, userId: string): Promise<{message: string}> {
      try {
        const auth = await this.authModel.findByIdAndUpdate(userId, {school: schoolId})

        if(!auth)
          throw new NotFoundException("User not found")

        return {message: 'School added successfully'}
      }
      catch(err)
      {
        throw new InternalServerErrorException("Failed to add school")
      }
    }
}
