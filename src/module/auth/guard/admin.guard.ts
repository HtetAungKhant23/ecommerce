import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AdminAuthGuard extends AuthGuard() {
  handleRequest(err: any, admin: any) {
    if (err || !admin) {
      throw new UnauthorizedException({
        message: err?.message || 'Invalid token.',
        code: HttpStatus.UNAUTHORIZED,
        description: 'Invalid or Expire token.',
      });
    }
    return admin;
  }
}
