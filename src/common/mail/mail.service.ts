// // src/infra/mail/mail.service.ts
// import { Injectable } from '@nestjs/common';
// import { MailerService } from '@nestjs-modules/mailer';
// import { render } from '@react-email/render';
// import OrderNotification, {
//   OrderNotificationProps,
// } from './templates/order-notification';

// @Injectable()
// export class MailService {
//   constructor(private readonly mailer: MailerService) {}

//   /** Письмо при продаже товара */
//   async sendOrderNotification(to: string, props: OrderNotificationProps) {
//     // Рендерим React-компонент в HTML
//     const html = render(<OrderNotification {...props} />);
//     await this.mailer.sendMail({
//       to,
//       subject: `Ваш товар ${props.productName} продан!`,
//       html,             // используем готовый HTML
//     });
//   }
// }

// /*
// // src/modules/orders/orders.service.ts
// import { Injectable } from '@nestjs/common';
// import { MailService } from '@/infra/mail/mail.service';

// @Injectable()
// export class OrdersService {
//   constructor(private readonly mailService: MailService) {}

//   async notifySale(userEmail: string, productName: string, price: number, qty: number) {
//     const total = price * qty;
//     await this.mailService.sendOrderNotification(userEmail, {
//       productName,
//       price,
//       quantity: qty,
//       total,
//     });
//   }
// }
// */
