import mongoose, { model, models, Schema } from 'mongoose';

const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    images: [{ type: String }],
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    gender: { type: mongoose.Schema.Types.ObjectId, ref: 'Gender' },
    properties: { type: Object },
  },
  {
    timestamps: true,
  },
);

export const Product = models?.Product || model('Product', ProductSchema);
