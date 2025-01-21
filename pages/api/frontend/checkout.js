import { mongooseConnect } from '@/lib/mongoose';
import { Order } from '@/models/Order';
import { Product } from '@/models/Product';
import { Users } from '@/models/Accounts'; // Assuming User schema is exported correctly
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
const stripe = require('stripe')(process.env.STRIPE_SK);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed. Use POST.' });
    return;
  }

  const UserSession = await getServerSession(req, res, authOptions);

  const userId = UserSession?.user?.id;

  const { name, email, city, postalCode, streetAddress, country, itemIds } =
    req.body; // Include `userId` for logged-in users
  await mongooseConnect();

  // Fetch unique product IDs and details
  const cartItems = itemIds;
  const uniqueIds = [...new Set(cartItems)];
  const itemInfos = await Product.find({ _id: uniqueIds });

  // Build line_items for Stripe Checkout
  let line_items = [];
  for (const itemId of uniqueIds) {
    const itemInfo = itemInfos.find((p) => p._id.toString() === itemId);
    const quantity = cartItems.filter((id) => id === itemId)?.length || 0;
    if (quantity > 0 && itemInfo) {
      line_items.push({
        quantity,
        price_data: {
          currency: 'USD',
          product_data: { name: itemInfo.title },
          unit_amount: ((quantity * itemInfo.price) / quantity) * 100,
        },
      });
    }
  }

  // Create the order document
  const orderDoc = await Order.create({
    line_items,
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    paid: false,
    deliveryDetails: {
      status: 'Order Placed', // Initial status
      trackingNumber: `SIM${Math.floor(Math.random() * 1e9)}`, // Fake tracking
      estimatedDeliveryDate: new Date(Date.now() + 1000 * 60 * 60 * 24), // Tomorrow
      nextUpdateAt: new Date(Date.now() + 1000 * 60), // 1 minute from now
    },
  });

  // If user is logged in, associate the order with their account
  let user;
  if (userId) {
    user = await Users.findById(userId);
  } else {
    // Try to find a user by email for guest checkout
    user = await Users.findOne({ email });
  }

  if (user) {
    // Add order to user's order history
    user.orderHistory.push({
      orderId: orderDoc._id,
      estimatedDeliveryDate: orderDoc.deliveryDetails.estimatedDeliveryDate,
      trackingNumber: orderDoc.deliveryDetails.trackingNumber,
      nextUpdateAt: orderDoc.deliveryDetails.nextUpdateAt,
      status: orderDoc.deliveryDetails.status,
      total:
        line_items.reduce(
          (sum, item) => sum + item.price_data.unit_amount * item.quantity,
          0
        ) / 100,
      createdAt: new Date(),
    });
    await user.save();
  }

  // Create Stripe session
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    customer_email: email, // Required for Stripe's guest checkout
    success_url: `${process.env.PUBLIC_URL}/cart?success=1`,
    cancel_url: `${process.env.PUBLIC_URL}/cart?cancelled=1`,
    metadata: {
      orderId: orderDoc._id.toString(),
      userId: user ? user._id.toString() : 'guest',
    },
  });

  res.json({
    url: session.url,
  });
}
