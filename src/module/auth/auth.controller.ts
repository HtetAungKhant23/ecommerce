import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { IResponse } from 'src/core/interfaces/response.interface';

@ApiTags('Auth')
@Controller('auth/admin')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register for admin account.' })
  @ApiBody({ type: RegisterDto })
  async registerAdmin(@Body() payload: RegisterDto): Promise<IResponse> {
    return this.authService
      .register(payload)
      .then((data): IResponse => {
        return {
          _data: data,
          _metaData: {
            message: 'Admin successfully registered.',
            statusCode: HttpStatus.CREATED,
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

  @Post('login')
  @ApiOperation({ summary: 'Admin login.' })
  @ApiBody({ type: LoginDto })
  async loginAdmin(@Body() payload: LoginDto): Promise<IResponse> {
    return this.authService
      .login(payload)
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
}
