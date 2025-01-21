// pages/api/getUpdatedOrders.js
import { mongooseConnect } from '@/lib/mongoose';
import { Users } from '@/models/Accounts';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
  await mongooseConnect();
  
  const session = await getServerSession(req, res, authOptions);
  const userEmail = session.user.email;

  if (!userEmail) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const user = await Users.findOne({ email: userEmail })
    .populate('orderHistory.orderId')
    .select('orderHistory');

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  return res.status(200).json({ orderHistory: user.orderHistory });
}
