import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IUserAuth } from 'src/core/interfaces/current-user.interface';
import { RegisterDto } from '../auth/dto/auth.dto';
import { DbHelperService } from 'src/shared/helper/DbHelper.service';
import { BadRequestException } from 'src/core/exceptions/bad-request.exception';

@Injectable()
export class AdminService {
  constructor(
    private readonly dbService: PrismaService,
    private readonly DbHelper: DbHelperService,
  ) {}

  async create(payload: RegisterDto) {
    const adminExist = await this.DbHelper.findUserExist(
      payload.email,
      'admin',
    );
    if (adminExist) {
      throw new BadRequestException({
        message: 'Admin already exist with this email.',
        code: HttpStatus.BAD_REQUEST,
      });
    }
    const admin = await this.DbHelper.createUser(payload, 'admin');
    delete admin.password;
    return admin;
  }

  async getAll(admin: IUserAuth) {
    return this.dbService.admin.findMany({
      where: {
        id: {
          not: admin.id,
        },
        isDeleted: false,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async getMe(id: string) {
    return this.dbService.admin.findUnique({
      where: { id, isDeleted: false },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
