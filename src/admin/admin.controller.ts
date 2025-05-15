import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CategoryService } from 'src/category/category.service';
import { CategoryDto, updateCategoryDto } from 'src/category/dto/category.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { updateOrderStatusDto } from 'src/order/dto/order.dto';
import { OrderService } from 'src/order/order.service';
import { ProductDto, updateProductDto } from 'src/product/dto/product.dto';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';
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
    private readonly categoryService: CategoryService,
    private readonly productService: ProductService,
    private readonly userService: UserService
    ) {}
  
  @ApiOperation({ summary: 'Create category' })
  @Post('category/create')
  async createCategory(@Body() dto: CategoryDto) {
    return await this.categoryService.createCategory(dto);
  }
  
  @ApiOperation({ summary: 'Update a category' })
  @Patch('catergory/update/:id')
  async updateCategory(@Param('id') id: string, @Body() dto: updateCategoryDto) {
    return this.categoryService.updateCategory(id, dto);
  }
  
  @ApiOperation({ summary: 'Delete a category' })
  @Delete('category/delete/:id')
  async deleteCategory(@Param('id') id: string) {
    return this.categoryService.deleteCategory(id);
  }
  
  @ApiOperation({ summary: 'Create product' })
  @Post('product/create')
  async createProduct(@Body() dto: ProductDto) {
    return await this.productService.createProduct(dto);
  }
  
  @ApiOperation({ summary: 'Update product' })
  @Patch('product/update/:id')
  async updateProduct(@Param('id') id: string, @Body() dto: updateProductDto) {
    return this.productService.updateProduct(id, dto);
  }
  
  @ApiOperation({ summary: 'Delete product' })
  @Delete('product/delete/:id')
  async deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
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
   
  @ApiOperation({ summary: 'Get all users' })
  @Get('user/users')
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'Delete user' })
  @Delete('user/delete/:id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

}
