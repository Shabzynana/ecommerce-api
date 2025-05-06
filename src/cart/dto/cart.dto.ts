import { IsNotEmpty, IsUUID, IsInt, Min } from 'class-validator';

export class CreateCartItemDto {
  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @IsInt()
  @Min(1)
  quantity: number;
}

export class UpdateCartItemDto {
  @IsNotEmpty()
  @IsUUID()
  cartItemId: string;

  @IsInt()
  @Min(1)
  quantity: number;
}


