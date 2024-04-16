import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { IResponse } from 'src/core/interfaces/response.interface';
import { AdminAuthGuard } from '../auth/guard/admin.guard';
import { CurrentUser } from 'src/core/decorator/current-user.decorator';
import { IUserAuth } from 'src/core/interfaces/current-user.interface';
import { RegisterDto } from '../auth/dto/auth.dto';

@ApiTags('Admin')
@ApiBearerAuth()
@UseGuards(AdminAuthGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('create')
  async createAdmin(@Body() payload: RegisterDto): Promise<IResponse> {
    return this.adminService
      .create(payload)
      .then(
        (newAdmin): IResponse => ({
          _data: newAdmin,
          _metaData: {
            message: 'Created new admin successfully.',
            statusCode: HttpStatus.CREATED,
          },
        }),
      )
      .catch((err) => {
        if (err instanceof HttpException) throw err;
        throw new InternalServerErrorException({
          err: new Error(err.message),
          message: 'Internal server error.',
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        });
      });
  }

  @Get()
  async getAllAdmin(@CurrentUser() admin: IUserAuth): Promise<IResponse> {
    return this.adminService
      .getAll(admin)
      .then((admins): IResponse => {
        return {
          _data: admins,
          _metaData: {
            message: 'Fetched all admin successfully.',
            statusCode: HttpStatus.OK,
          },
        };
      })
      .catch((err) => {
        if (err instanceof HttpException) throw err;
        throw new InternalServerErrorException({
          err: new Error(err.message),
          message: 'Internal server error.',
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        });
      });
  }

  @Get('profile')
  async getMeAdmin(@CurrentUser() admin: IUserAuth): Promise<IResponse> {
    return this.adminService
      .getMe(admin.id)
      .then(
        (admin): IResponse => ({
          _data: admin,
          _metaData: {
            message: 'Admin fetched profile successfully.',
            statusCode: HttpStatus.OK,
          },
        }),
      )
      .catch((err) => {
        if (err instanceof HttpException) throw err;
        throw new InternalServerErrorException({
          err: new Error(err.message),
          message: 'Internal server error.',
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        });
      });
  }
}
