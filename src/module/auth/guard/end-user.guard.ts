import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class EndUserAuthGuard extends AuthGuard('end-user') {
  handleRequest(err: any, endUser: any) {
    if (err || !endUser) {
      throw new UnauthorizedException({
        message: err?.message || 'Invalid token.',
        code: HttpStatus.UNAUTHORIZED,
        description: 'Invalid or Expire token.',
      });
    }
    return endUser;
  }
}
