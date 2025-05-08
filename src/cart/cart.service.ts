import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppUtilities } from 'src/app.utilities';
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

  async emptyCart(cartId: string) {
    const cart = await this.getCartById(cartId);
    return await this.cartRepository.remove(cart);
  }

  async getCartItems(cartItenId: string) {
    const cartItem = await this.cartItemRepository.findOne({
       where: { id: cartItenId },
       relations: ['cart', 'cart.user'],
    })
    return cartItem;
  }

  async getCartById(cartId: string) {
    
    const cart = await this.cartRepository.findOne({
       where: { id: cartId },
       relations: ['cartItems', 'cartItems.product'],
    });
    return cart;
  }
  
  async getUserCart(userId: string) {
    const cart = await this.cartRepository.findOne({
       where: { user: { id: userId } },
       relations: ['cartItems', 'cartItems.product'],
    });
    return cart;
  }

  async addItemToCart(userId: string, dto: CreateCartItemDto ) {
    const product = await this.productRepository.findOneBy({ id: dto.productId });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    let cart = await this.getUserCart(userId);
    if (!cart) {
      cart = await this.createCart(userId);
    }

    const cartItem = await this.cartItemRepository.create({
      product,
      quantity: dto.quantity,
      cart: { id: cart.id },
    })
    await this.cartItemRepository.save(cartItem);
    cart = await this.getCartById(cart.id);
    cart.totalAmount = AppUtilities.totalPrice(cart.cartItems);
    await this.cartRepository.save(cart);
    return this.getUserCart(userId);
  }

  async updateCartItem(userId: string , dto: UpdateCartItemDto) {

    const cartItem = await this.getCartItems(dto.cartItemId);
    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    if (cartItem.cart.user.id !== userId) {
      throw new ForbiddenException('You are not authorized to update this cart item');
    }

    if (dto.quantity <= 0) {
      await this.cartItemRepository.remove(cartItem);
    } else {
      cartItem.quantity = dto.quantity;
      await this.cartItemRepository.save(cartItem);
    }

    const cart = await this.getCartById(cartItem.cart.id);
    cart.totalAmount = AppUtilities.totalPrice(cart.cartItems);
    await this.cartRepository.save(cart);
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

    const cart = await this.getCartById(cartItem.cart.id);
    cart.totalAmount = AppUtilities.totalPrice(cart.cartItems);
    await this.cartRepository.save(cart);
    return this.getUserCart(userId);
  }

}


