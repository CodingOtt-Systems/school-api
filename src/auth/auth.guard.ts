import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: any
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as AuthenticatedRequest;
    const token = request.cookies['__T'];
    
    if (!token) 
      throw new UnauthorizedException('TOKEN_VALIDATION_FAILED1');

    try {
      const payload = await this.jwtService.verifyAsync(token);
      request.user = payload
    } 
    catch(err) 
    {
      throw new UnauthorizedException('TOKEN_VALIDATION_FAILED2');
    }
    return true;
  }
}

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as AuthenticatedRequest;
    const token: any = request.cookies['__T'] || request.headers['x-access-token'];
    
    if (!token) 
      throw new UnauthorizedException('TOKEN_VALIDATION_FAILED');

    try {
      const payload = await this.jwtService.verifyAsync(token);
      request.user = payload
    } 
    catch(err) 
    {
      throw new UnauthorizedException('TOKEN_VALIDATION_FAILED');
    }
    return true;
  }
}

@Injectable()
export class OtpVerifiedGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as AuthenticatedRequest;
    const token = request.cookies['__OTP'];
    
    if (!token) 
      throw new UnauthorizedException('TOKEN_VALIDATION_FAILED');

    try {
      const payload = await this.jwtService.verifyAsync(token);
      request.user = payload
    } 
    catch(err) 
    {
      throw new UnauthorizedException('TOKEN_VALIDATION_FAILED');
    }
    return true;
  }
}