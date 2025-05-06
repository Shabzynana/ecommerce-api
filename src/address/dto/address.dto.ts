import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, MinLength } from 'class-validator';

export class CreateAddressDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    street_address: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    city: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    state: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    country: string;

    @IsOptional()
    @IsString()
    @MinLength(5)
    zipCode?: string;

    @IsOptional()
    @IsString()
    @MinLength(5)
    phoneNumber?: string;

    @IsOptional()
    @IsString()
    @MinLength(5)
    additionalInfo?: string;

}

export class UpdateAddressDto  {
    
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    street_address: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    city: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    state: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    country: string;

    @IsOptional()
    @IsString()
    @MinLength(5)
    zipCode?: string;

    @IsOptional()
    @IsString()
    @MinLength(5)
    phoneNumber?: string;

    @IsOptional()
    @IsString()
    @MinLength(5)
    additionalInfo?: string;

}

