import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { IResponse } from 'src/core/interfaces/response.interface';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('admin/login')
  @ApiBody({ type: LoginDto })
  async loginAdmin(@Body() payload: LoginDto): Promise<IResponse> {
    return this.authService
      .adminLogin(payload)
      .then((data): IResponse => {
        return {
          _data: data,
          _metaData: {
            message: 'Admin login successfully.',
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

  @Post('end-user/register')
  @ApiBody({ type: RegisterDto })
  async endUserRegister(@Body() payload: RegisterDto): Promise<IResponse> {
    return this.authService
      .endUserRegister(payload)
      .then(
        (endUser): IResponse => ({
          _data: endUser,
          _metaData: {
            message: 'End user account registered successfully.',
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

  @Post('end-user/login')
  @ApiBody({ type: LoginDto })
  async loginEndUser(@Body() payload: LoginDto): Promise<IResponse> {
    return this.authService
      .endUserLogin(payload)
      .then(
        (data): IResponse => ({
          _data: data,
          _metaData: {
            message: 'End user login successfully.',
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
