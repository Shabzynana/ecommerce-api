import { IsEmail, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class ProductDto {

    @IsString()
    name: string;

    @IsString()
    description: string;
    
    @IsNumber()
    price: number;
    
    @IsString()
    @IsOptional()
    imageUrl?: string;

    @IsNumber()
    stock?: number;
    
    @IsString()
    @IsUUID()
    category: string;

}
