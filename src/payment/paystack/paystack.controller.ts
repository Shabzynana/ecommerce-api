
import { Controller, Post, Get, Body, Query, Headers, Req, UseGuards } from '@nestjs/common';
import { PaystackService } from './paystack.service';
import { Request } from 'express';
import { CreatePaymentDto } from '../dto/payment.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

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


}
