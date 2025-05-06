import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength, minLength } from 'class-validator';

export class CategoryDto {

    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    imageUrl?: string;

}

export class updateCategoryDto {

    @IsOptional()
    @IsString()
    @MinLength(1)
    name?: string;

    @IsOptional()
    @IsString() 
    description?: string;
    
    @IsOptional()
    @IsString()
    imageUrl?: string;

}