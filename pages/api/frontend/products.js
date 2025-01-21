import { mongooseConnect } from '@/lib/mongoose';
import { Category } from '@/models/Category';
import { Gender } from '@/models/Gender';
import { Product } from '@/models/Product';

export default async function handler(req, res) {
  try {
    await mongooseConnect();
    const products = await Product.find().populate('gender');
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
}
