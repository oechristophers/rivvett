import { mongooseConnect } from '@/lib/mongoose';
import { Blog } from '@/models/Blog';
import { Category } from '@/models/Category';
import { Gender } from '@/models/Gender';
export default async function handler(req, res) {
  try {
    await mongooseConnect();
    const products = await Blog.find().populate('gender').populate('category');
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
}
