import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException } from 'src/core/exceptions/bad-request.exception';

@Injectable()
export class AuthService {
  constructor(
    private readonly dbService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(payload: RegisterDto) {
    const adminExist = await this.findUserExist(payload.email, 'admin');
    if (adminExist) {
      throw new BadRequestException({
        message: 'Email is already exist.',
        code: HttpStatus.BAD_REQUEST,
      });
    }
    const admin = await this.createUser(payload, 'admin');
    delete admin.password;
    return admin;
  }

  async login(payload: LoginDto) {
    const admin = await this.findUserExist(payload.email, 'admin');
    if (!admin) {
      throw new BadRequestException({
        message: 'Admin not found.',
        code: HttpStatus.BAD_REQUEST,
      });
    }
    const isPasswordMatch = await this.verify(payload.password, admin.password);
    if (!isPasswordMatch) {
      throw new BadRequestException({
        message: 'Password is not match.',
        code: HttpStatus.BAD_REQUEST,
      });
    }
    const token = await this.generateToken(
      { id: admin.id, email: admin.email },
      process.env.ADMIN_SECRET_KEY,
    );
    return { token };
  }

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

  private async hash(data: string) {
    return argon2.hash(data);
  }

  private async verify(data: string, hashedData: string) {
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
