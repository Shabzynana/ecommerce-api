import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { v4 } from 'uuid';
const CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMS = '0123456789';
import * as fs from 'fs';
import * as crypto from 'crypto';
import * as dayjs from 'dayjs';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AppUtilities {

  public static hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  public static comparePassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }

  public static generateToken(len?: number): string {
    return crypto.randomBytes(len || 32).toString('hex');
  }

  public static hashToken(token: string, userId?: string): string {
    return crypto
      .createHash('sha256')
      .update(token + (userId || ''))
      .digest('hex');
  }

  public static exp1hr(): number {
    return Date.now() + 3600 * 1000;
  }

  public static genUuid() {
    return v4();
  }

  public static readFile(filePath: string) {
    return fs.readFileSync(filePath, 'utf8');
  }

  public static totalPrice(items: any[]) {
    const total = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    return parseFloat(total.toFixed(2));
  }

  public static generateTrackingNumber() {
    return crypto.randomBytes(7).toString('hex');
  }
  
  public static dateOnly () {

    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  }

  public static compareString(value1: string, value2: string) {
    if (value1 === value2) return true;

    return false;
  }



 

} 
