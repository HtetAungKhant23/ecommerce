import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/module/prisma/prisma.service';

@Injectable()
export class AdminStrategy extends PassportStrategy(Strategy, 'admin') {
  constructor(private readonly dbService: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.ADMIN_SECRET_KEY,
    });
  }

  async validate(payload: {
    id: string;
    email: string;
    iat: number;
    exp: number;
  }) {
    const admin = await this.dbService.admin.findUnique({
      where: { id: payload.id, isDeleted: false },
    });
    if (!admin) {
      throw new Error('Invalid Token.');
    }
    return { id: admin.id, email: admin.email };
  }
}
