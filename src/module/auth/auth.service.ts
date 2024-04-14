import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(private readonly dbService: PrismaService) {}

  async register(payload: RegisterDto) {
    try {
      const adminExist = await this.findUserExist(payload.email, 'admin');
      if (adminExist) {
        throw new BadRequestException({
          message: 'Email is already exist.',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }
      return await this.createUser(payload, 'admin');
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException({
        err: new Error(err),
        message: 'Internal server error.',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async login(payload: LoginDto) {
    const adminExist = await this.findUserExist(payload.email, 'admin');
    if (!adminExist) {
      throw new BadRequestException({
        message: 'Admin not found.',
      });
    }
    const isPasswordMatch = await this.verify(
      payload.password,
      adminExist.password,
    );
    if (!isPasswordMatch) {
      throw new BadRequestException({
        message: 'Password is not match.',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }
    // use passport-jwt to generate jwt token
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
    await this.dbService[`${tableName}`].create({
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
}
