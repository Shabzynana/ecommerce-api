import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { AuthService } from './auth.service';
import { resendConfirmationMailDto, resetPasswordDto, UserLoginDto } from './dto/auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('register')
  async register(@Body()dto: CreateUserDto) {
    return await this.authService.register(dto);
  }

  @Post('login')
  async login(@Body()dto: UserLoginDto) {
    return await this.authService.login(dto);
  }

  @Post('resend-confirmation-mail')
  async resendMail(@Body() dto: resendConfirmationMailDto) {
    return await this.authService.resendMail(dto);
  }

  @Get('confirm-email')
  async confirmEmail(@Query('token') token: string) {
    return await this.authService.confirmEmail(token);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() dto: resendConfirmationMailDto) {
    return await this.authService.forgotPassword(dto);
  }

  @Post('reset-password')
  async resetPassword(@Query('token') token: string, @Body() dto: resetPasswordDto) {
    return await this.authService.resetPassword(token, dto);
  }
}
