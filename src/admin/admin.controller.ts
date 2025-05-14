import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CategoryService } from 'src/category/category.service';
import { CategoryDto, updateCategoryDto } from 'src/category/dto/category.dto';
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
    private readonly orderService: OrderService,
    private readonly categoryService: CategoryService
    ) {}
  
  @ApiOperation({ summary: 'Create category' })
  @Post('category/create')
  async createCategory(@Body() dto: CategoryDto) {
    return await this.categoryService.createCategory(dto);
  }

  @Patch('catergory/update/:id')
  async updateCategory(@Param('id') id: string, @Body() dto: updateCategoryDto) {
    return this.categoryService.updateCategory(id, dto);
  }

  @Delete('category/delete/:id')
  async deleteCategory(@Param('id') id: string) {
    return this.categoryService.deleteCategory(id);
  }

  @ApiOperation({ summary: 'Update order status' })
  @Patch('order/update-status/:orderId')
  async updateOrderStatus(@Param('orderId') orderId: string, @Body() dto: updateOrderStatusDto) {
    return this.orderService.updateOrderStatus(orderId, dto);
  }
  
  @ApiOperation({ summary: 'Get all orders' })
  @Get('order/orders')
  async getAllOrders() {
    return this.orderService.getAllOrders();
  }

}
