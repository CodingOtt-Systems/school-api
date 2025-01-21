import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
const SECRET = "be91876bae3ef244f440bb36c77f97944f674c722547b27fcd8587aaacf48f11"

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
      throw new UnauthorizedException('TOKEN_VALIDATION_FAILED');

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: SECRET
        }
      );
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
export class SessionGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as AuthenticatedRequest;
    const token: any = request.cookies['__T'] || request.headers['x-access-token'];
    
    if (!token) 
      throw new UnauthorizedException('TOKEN_VALIDATION_FAILED');

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: SECRET
        }
      );
      request.user = payload
    } 
    catch(err) 
    {
      throw new UnauthorizedException('TOKEN_VALIDATION_FAILED');
    }
    return true;
  }
}
