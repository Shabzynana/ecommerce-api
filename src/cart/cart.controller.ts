import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CartService } from './cart.service';
import { CreateCartItemDto, UpdateCartItemDto } from './dto/cart.dto';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('create-cart')
  @ApiOperation({ summary: 'Create a new cart' })
  async createCart(@Req() req) {

    const { sub } = req.user;
    return this.cartService.createCart(sub);
  }

  @Get('user-cart')
  @ApiOperation({ summary: 'Get current logged in user cart' })
  async getUserCart(@Req() req) {

    const { sub } = req.user;
    return this.cartService.getUserCart(sub);
  }

  @Post('add-item')
  @ApiOperation({ summary: 'Add an item to the user\'s cart' })
  async addItemToCart(@Req() req, @Body() dto: CreateCartItemDto) {

    const { sub } = req.user;
    return this.cartService.addItemToCart(sub, dto);
  }

  @Patch('update-item')
  @ApiOperation({ summary: 'Update an item in the user\'s cart' })
  async updateCartItem(@Req() req, @Body() dto: UpdateCartItemDto) {

    const { sub } = req.user;
    return this.cartService.updateCartItem(sub, dto);
  }

  @Delete('delete-item/:cartItemId')
  @ApiOperation({ summary: 'Remove an item from the user\'s cart' })
  async emoveItemFromCart(@Req() req, @Param('cartItemId') cartItemId: string) {

    const { sub } = req.user;
    return this.cartService.removeItemFromCart(sub, cartItemId);
  }


  
  
}
