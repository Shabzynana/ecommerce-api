import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';
import { Repository } from 'typeorm';
import { threadId } from 'worker_threads';
import { CreateCartItemDto, UpdateCartItemDto } from './dto/cart.dto';
import { Cart, CartItem } from './entities/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) 
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

  ) {}

  async createCart(userId: string) {
    const cart = await this.cartRepository.create({
      user: { id: userId },
    });
    return await this.cartRepository.save(cart);
  }

  async getCartItems(cartItenId: string) {
    const cartItem = await this.cartItemRepository.findOne({
       where: { id: cartItenId },
       relations: ['cart', 'cart.user'],
    })
    return cartItem;
  }
  
  async getUserCart(userId: string) {
    const cart = await this.cartRepository.findOne({
       where: { user: { id: userId } },
       relations: ['cartItems', 'cartItems.product'],
    });
    if (!cart) {
      throw new Error('Cart not found');
    }
    return cart;
  }

  async addItemToCart(userId: string, dto: CreateCartItemDto ) {
    const product = await this.productRepository.findOneBy({ id: dto.productId });
    if (!product) {
      throw new Error('Product not found');
    }

    let cart = await this.getUserCart(userId);
    if (!cart) {
      cart = await this.createCart(userId);
    }
    const cartItem = new CartItem();
    cartItem.quantity = dto.quantity;
    cartItem.cart = cart;
    cartItem.product = product;
    cart.cartItems.push(cartItem);
    await this.cartRepository.save(cart);
    return cart;
  }

  async updateCartItem(userId: string , dto: UpdateCartItemDto) {

    const cartItem = await this.getCartItems(dto.cartItemId);

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    if (cartItem.cart.user.id !== userId) {
      throw new ForbiddenException('You are not authorized to update this cart item');
    }

    cartItem.quantity = dto.quantity;
    await this.cartItemRepository.save(cartItem);
    return this.getUserCart(userId);
   
  }

  async removeItemFromCart(userId: string, cartItemId: string) {
    const cartItem = await this.getCartItems(cartItemId);
    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }
    if (cartItem.cart.user.id !== userId) {
      throw new ForbiddenException('You are not authorized to delete this cart item');
    }
    await this.cartItemRepository.remove(cartItem);
    return this.getUserCart(userId);
  }

}


