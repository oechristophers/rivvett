import { mongooseConnect } from '@/lib/mongoose';
import { Order } from '@/models/Order';
const stripe = require('stripe')(process.env.STRIPE_SK);
import { buffer } from 'micro';

const endpointSecret =
  'whsec_56adfab63997fb258268d16d8c9f41bd887775b6f11be7ec3b9229b3ab373189';

export default async function handler(req, res) {
  await mongooseConnect();
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      await buffer(req),
      sig,
      endpointSecret,
    );
    console.log('Webhook event successfully constructed:', event);
  } catch (err) {
    console.error('Webhook Error:', err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const data = event.data.object;
      console.log('Checkout session completed data:', data);

      const orderId = data.metadata?.orderId; // Ensure metadata contains `orderId`
      const paid = data.payment_status === 'paid';
      console.log(`Order ID: ${orderId}, Paid: ${paid}`);

      if (orderId && paid) {
        const updatedOrder = await Order.findByIdAndUpdate(
          orderId,
          { paid: true },
          { new: true }, // Return the updated document
        );
        console.log('Updated Order:', updatedOrder);
      } else {
        console.warn('Order ID or payment status not valid:', {
          orderId,
          paid,
        });
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send('ok');
}
