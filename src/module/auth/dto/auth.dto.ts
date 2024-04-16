import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

class BaseAuthDto {
  @ApiProperty({ example: 'admin@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'admin12345' })
  @IsNotEmpty()
  @MinLength(8)
  @IsAlphanumeric()
  password: string;
}

export class RegisterDto extends BaseAuthDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class LoginDto extends BaseAuthDto {}
