import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AdminStrategy } from './strategy/admin.strategy';

@Module({
  imports: [PassportModule, JwtModule.register({ global: true })],
  controllers: [AuthController],
  providers: [AuthService, AdminStrategy],
})
export class AuthModule {}
