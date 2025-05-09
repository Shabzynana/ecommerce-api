import { IsDecimal, IsString, IsUUID } from "class-validator";

export class CreatePaymentDto {
    @IsUUID()
    orderId: string;
}

export class savePaymentDto {
  @IsUUID()
  paymentId: string;

  @IsString()
  status: string;

  @IsString()
  reference: string;

  @IsString()
  transactionId: string;

  @IsString()
  method: string;

  @IsString()
  amount: string;

  @IsString()
  currency: string;

  @IsString()
  metadata: string;

  @IsString()
  orderId: string;

  @IsString()
  userId: string;

  @IsString()
  createdAt: string;

  @IsString()
  updatedAt: string;

  @IsString()
  deletedAt: string;

  @IsString()
  deletedBy: string;

}
