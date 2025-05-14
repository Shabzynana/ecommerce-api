import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { updateOrderStatusDto } from 'src/order/dto/order.dto';
import { OrderService } from 'src/order/order.service';
import { AdminService } from './admin.service';
import { RolesGuard } from './guards/admin.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@ApiBearerAuth()
@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly orderService: OrderService
    ) {}

  @ApiOperation({ summary: 'Update order status' })
  @Patch('/update-status/:orderId')
  async updateOrderStatus(@Param('orderId') orderId: string, @Body() dto: updateOrderStatusDto) {
    return this.orderService.updateOrderStatus(orderId, dto);
  }
  
  @ApiOperation({ summary: 'Get all orders' })
  @Get('/get-all-orders')
  async getAllOrders() {
    return this.orderService.getAllOrders();
  }

}
