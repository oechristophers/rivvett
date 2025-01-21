import { mongooseConnect } from '@/lib/mongoose';
import { Category } from '@/models/Category';

export default async function handler(req, res) {
  try {
    await mongooseConnect();
    const categories = await Category.find({}).exec();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
}
