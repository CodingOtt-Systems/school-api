import { Injectable, CanActivate, ExecutionContext, ConflictException, NotFoundException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class PreventUnwantedOtpGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { query, body } = request;

    if (!query.type || !['signup', 'login'].includes(query.type)) {
      throw new ConflictException('Invalid otp type');
    }

    const user = await this.authService.isUserExist(body.mobile);

    if (query.type === 'signup' && user) {
      throw new ConflictException('User already exists. Please log in to continue.');
    }

    if (query.type === 'login' && !user) {
      throw new NotFoundException('User does not exist. Please sign up to continue.');
    }

    return true;
  }
}
