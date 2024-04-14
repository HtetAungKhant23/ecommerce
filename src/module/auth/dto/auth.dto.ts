import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  IsString,
  Min,
} from 'class-validator';

class BaseAuthDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @Min(8)
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
