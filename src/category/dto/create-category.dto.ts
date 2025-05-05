import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class CategoryDto {

    @IsString()
    name: string;

    @IsString()
    description: string;
    
    @IsString()
    @IsOptional()
    imageUrl?: string;

}

export class updateCategoryDto {

    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    description: string;
    
    @IsString()
    @IsOptional()
    imageUrl?: string;

}
