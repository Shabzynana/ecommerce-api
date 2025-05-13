import { IsOptional, IsString, IsUUID } from "class-validator";

export interface PaystackWebApi {
    endpoint: string;
    method: string;
    secretKey: string;
    body?: any;
    queryParams?: Record<string, any>;
}

export type CreateTransactionResponseDto = {
    status: boolean;
    message: string;
    data: { 
        authorization_url: string; 
        access_code: string; 
        reference: string 
    };
};

export class CreatePaymentDto {
    @IsUUID()
    orderId: string;
}

export class verifyPaymentDto {
    @IsString()
    reference: string;

    @IsOptional()
    @IsString()
    trxref?: string;
}