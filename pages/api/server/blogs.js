import mongoose from 'mongoose';
import { isAdminRequest } from '../auth/[...nextauth]';
import { mongooseConnect } from '@/lib/mongoose';
import { Blog } from '@/models/Blog';
export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  await isAdminRequest(req, res);
  if (method === 'GET') {
    if (req.query?.id) {
      res.json(await Blog.findOne({ _id: req.query.id }));
    } else {
      res.json(await Blog.find());
    }
  }
  if (method === 'POST') {
    const {
      title,
      mainImages,
      body,
      subtitles,
      featuredProducts,
      author,
      gender,
      mediaCaptions,
      category,
    } = req.body;
    const blogDoc = await Blog.create({
      title,
      mainImages,
      body,
      subtitles,
      featuredProducts,
      author,
      gender,
      mediaCaptions,
      category,
    });
    res.json(blogDoc);
  }
  if (method === 'PUT') {
    const {
      _id,
      title,
      mainImages,
      body,
      subtitles,
      featuredProducts,
      author,
      gender,
      mediaCaptions,
      category,
    } = req.body;
    await Blog.updateOne(
      { _id },
      {
        title,
        mainImages,
        body,
        subtitles,
        featuredProducts,
        author,
        gender,
        mediaCaptions,
        category,
      },
    );
    res.json(true);
  }
  if (method === 'DELETE') {
    const { _id } = req.query;
    await Blog.deleteOne({ _id });
    res.json('ok');
  }
}
