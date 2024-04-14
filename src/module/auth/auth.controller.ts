import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto, RegisterDto } from './dto/auth.dto';

@ApiTags('Auth')
@Controller('auth/admin')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Admin register.' })
  @ApiBody({ type: RegisterDto })
  async registerAdmin(@Body() payload: RegisterDto) {
    await this.authService.register(payload);
  }

  @Post('login')
  @ApiOperation({ summary: 'Admin login.' })
  @ApiBody({ type: LoginDto })
  async loginAdmin(@Body() payload: LoginDto) {
    await this.authService.login(payload);
  }
}
