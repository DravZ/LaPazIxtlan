import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión y obtener Token' })
  async login(@Body() loginDto: LoginDto) {
  return await this.authService.login(loginDto);
  }
}