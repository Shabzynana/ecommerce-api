
import { Controller, Post, Get, Body, Query, Headers, Req, UseGuards, HttpCode } from '@nestjs/common';
import { PaystackService } from './paystack.service';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreatePaymentDto, verifyPaymentDto } from './dto/paystack.dto';
import { Public } from 'src/common/decorators/auth.public.decorator';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('transactions')
export class PaystackController {
  constructor(private readonly paystackService: PaystackService) {}

  @Post('initialize')
  async initializePayment(@Req() req, @Body() dto: CreatePaymentDto) {
    const { sub } = req.user
    return this.paystackService.initializePayment(sub, dto);
  }


  @Public()
  @Get('callback')
  async verifyPayment(@Query() dto: verifyPaymentDto) {
    return this.paystackService.verifyPayment(dto);
  }

  @Public()
  @HttpCode(200)
  @Post('webhook')
  async handleWebhook(@Req() req: Request, @Headers('x-paystack-signature') signature: string) {
    return this.paystackService.handleWebhook(req.body, signature);
  }



}
