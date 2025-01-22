import mongoose, { model, models, Schema } from 'mongoose';

const BlogSchema = new Schema(
  {
    title: { type: String, required: true },
    gender: { type: mongoose.Schema.Types.ObjectId, ref: 'Gender' },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    mainImages: [{ type: String }], // URL or path to the main image
    mediaCaptions: [{ type: String }],
    body: { type: String, required: true }, // Main content of the blog
    subtitles: [
      {
        subtitle: { type: String },
        subtitleImages: [{ type: String }], // Optional image for the subtitle
        subMediaCaptions: [{ type: String }],
        content: { type: String }, // Content related to this subtitle
        subProducts: [
          { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // Referencing Product schema
        ],
      },
    ],
    featuredProducts: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // Referencing Product schema
    ],
    author: { type: String }, // Optional field for author name
  },
  {
    timestamps: true, // Automatically handles createdAt and updatedAt
  },
);

export const Blog = models?.Blog || model('Blog', BlogSchema);
