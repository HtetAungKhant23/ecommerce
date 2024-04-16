import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/module/prisma/prisma.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../../module/auth/dto/auth.dto';
import { BadRequestException } from 'src/core/exceptions/bad-request.exception';

@Injectable()
export class DbHelperService {
  constructor(
    private readonly dbService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async findUserExist(email: string, tableName: string) {
    return await this.dbService[`${tableName}`].findUnique({
      where: {
        email,
        isDeleted: false,
      },
    });
  }

  async createUser(
    data: { name: string; email: string; password: string },
    tableName: string,
  ) {
    return this.dbService[`${tableName}`].create({
      data: {
        name: data.name,
        email: data.email,
        password: await this.hash(data.password),
      },
    });
  }

  async validateUserToLogin(data: LoginDto & { target: 'admin' | 'endUser' }) {
    const user = await this.findUserExist(data.email, data.target);
    if (!user) {
      const target = data.target === 'admin' ? 'Admin' : 'End user';
      throw new BadRequestException({
        message: `${target} not found.`,
        code: HttpStatus.BAD_REQUEST,
      });
    }
    const isPasswordMatch = await this.verify(data.password, user.password);
    if (!isPasswordMatch) {
      throw new BadRequestException({
        message: 'Password is not match.',
        code: HttpStatus.BAD_REQUEST,
      });
    }
    return user;
  }

  async loginUser(
    id: string,
    email: string,
    secretKey: string,
  ): Promise<string> {
    return this.generateToken({ id, email }, secretKey);
  }

  private async hash(data: string) {
    return argon2.hash(data);
  }

  async verify(data: string, hashedData: string) {
    return argon2.verify(hashedData, data);
  }

  private async generateToken(
    payload: { id: string; email: string },
    key: string,
  ) {
    return this.jwtService.signAsync(payload, {
      secret: key,
      expiresIn: '2h',
    });
  }
}
