import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/order.dto';


@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  
  @ApiOperation({ summary: 'Create order' })
  @Post('create-order')
  async createOrder(@Req() req, @Body() dto: CreateOrderDto) {
    const { sub } = req.user;
    return this.orderService.createOrder({ userId: sub, ...dto });
  }

  @ApiOperation({ summary: 'Get current user orders' })
  @Get('my-orders')
  async getMyOrders(@Req() req) {
    const { sub } = req.user;
    return this.orderService.getMyOrders(sub);
  }
  
  @ApiOperation({ summary: 'Get order by id' })
  @Get('order/:orderId')
  async getMyOrder(@Param('orderId') orderId: string) {
    return this.orderService.getOrderById(orderId);
  }
  
  @ApiOperation({ summary: 'Cancel an order' })
  @Patch('cancel-order/:orderId')
  async cancelOrder(@Param('orderId') orderId: string, @Req() req) {
    const { sub } = req.user;
    return this.orderService.cancelOrder(orderId, sub);
  }
   
}
