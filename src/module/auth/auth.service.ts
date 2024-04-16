import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { BadRequestException } from 'src/core/exceptions/bad-request.exception';
import { DbHelperService } from '../../shared/helper/DbHelper.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly dbService: PrismaService,
    private readonly DbHelper: DbHelperService,
  ) {}

  // ? ------------------ Admin ----------------------

  async adminLogin(payload: LoginDto) {
    const admin = await this.DbHelper.validateUserToLogin({
      ...payload,
      target: 'admin',
    });
    const token = await this.DbHelper.loginUser(
      admin.id,
      admin.email,
      process.env.ADMIN_SECRET_KEY,
    );
    return { token };
  }

  // ? -------------- End User --------------------

  async endUserRegister(payload: RegisterDto) {
    const userExist = await this.DbHelper.findUserExist(
      payload.email,
      'endUser',
    );
    if (userExist) {
      throw new BadRequestException({
        message: 'End user already exist with this email.',
        code: HttpStatus.BAD_REQUEST,
      });
    }
    const endUser = await this.DbHelper.createUser(payload, 'endUser');
    delete endUser.password;
    return endUser;
  }

  async endUserLogin(payload: LoginDto) {
    const endUser = await this.DbHelper.validateUserToLogin({
      ...payload,
      target: 'endUser',
    });
    const token = await this.DbHelper.loginUser(
      endUser.id,
      endUser.email,
      process.env.END_USER_SECRET_KEY,
    );
    return { token };
  }
}
