// // src/infra/mail/templates-react/OrderNotification.tsx
// import { Html, Head, Body, Container, Heading, Text, Section } from '@react-email/components';

// export interface OrderNotificationProps {
//   productName: string;
//   price: number;
//   quantity: number;
//   total: number;
// }

// export default function OrderNotification({
//   productName,
//   price,
//   quantity,
//   total,
// }: OrderNotificationProps) {
//   return (
//     <Html>
//       <Head />
//       <Body style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4' }}>
//         <Container style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px' }}>
//           <Heading style={{ color: '#333' }}>Новый заказ</Heading>
//           <Section>
//             <Text>Товар: <b>{productName}</b></Text>
//             <Text>Количество: {quantity}</Text>
//             <Text>Цена за шт.: ${price.toFixed(2)}</Text>
//             <Text style={{ marginTop: '16px', fontWeight: 'bold' }}>
//               Общая стоимость: ${total.toFixed(2)}
//             </Text>
//           </Section>
//         </Container>
//       </Body>
//     </Html>
//   );
// }
