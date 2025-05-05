import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CategoryDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    description: string;
    
    @IsString()
    @IsOptional()
    imageUrl?: string;

}

export class updateCategoryDto {

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    description: string;
    
    @IsString()
    @IsOptional()
    imageUrl?: string;

}
