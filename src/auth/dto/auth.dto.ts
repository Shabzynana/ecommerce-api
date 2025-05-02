import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class UserLoginDto {
    @IsString()
    @IsEmail()
    email: string;
  
    @IsString()
    @MinLength(6)
    @IsOptional()
    password: string;
}

export class resendConfirmationMailDto {
  @IsString()
  @IsEmail()
  email: string;
}
  