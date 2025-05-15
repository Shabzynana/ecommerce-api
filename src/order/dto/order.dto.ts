import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, MinLength } from 'class-validator';

export class CreateOrderDto {

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    userId: string;

    @IsOptional()
    @IsUUID()
    addressId: string;
}

export class updateOrderStatusDto {
    @IsNotEmpty()
    @IsString()
    status: string;
  }
