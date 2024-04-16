import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/module/prisma/prisma.service';

@Injectable()
export class EndUserStrategy extends PassportStrategy(Strategy, 'end-user') {
  constructor(private readonly dbService: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.END_USER_SECRET_KEY,
    });
  }

  async validate(payload: { id: string; email: string }) {
    const endUser = await this.dbService.endUser.findUnique({
      where: { id: payload.id, isDeleted: false },
    });
    if (!endUser) {
      throw new Error('Invalid Token.');
    }
    return { id: endUser.id, email: endUser.email };
  }
}
