import * as dotenv from 'dotenv';
dotenv.config();


export const CONSTANT = {
  AuthQ: 'authQueue',
  OrderQ: 'orderQueue',
};


export const AUTH_MAIL = {
  confirmMail: ' Email Verification',
  welcomeMail: ' Welcome Onboard',
  passswordChangeMail: 'Password Changed',
  forgotPasswordMail: 'Reset Password',
};

export const ORDER_MAIL = {
  orderPlaced: 'Order Placed',
  orderShipped: 'Order Shipped',
  orderDelivered: 'Order Delivered',
  orderCancelled: 'Order Cancelled',
}

