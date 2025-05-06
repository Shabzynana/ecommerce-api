import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, MinLength } from 'class-validator';

export class ProductDto {

    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsOptional()
    @IsString()
    description?: string;
    
    @IsNumber()
    price: number;
    
    @IsOptional()
    @IsString()
    imageUrl?: string;

    @IsOptional()
    @IsNumber()
    stock?: number;
    
    @IsString()
    @IsUUID()
    category: string;

}

export class updateProductDto {

    @IsOptional()
    @IsString()
    @MinLength(1)
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;
    
    @IsOptional()
    @IsNumber()
    price?: number;
    
    @IsOptional()
    @IsString()
    imageUrl?: string;

    @IsOptional()
    @IsNumber()
    stock?: number;
    
    @IsOptional()
    @IsString()
    @IsUUID()
    category: string;

}

