import mongoose, { model, models, Schema } from "mongoose";

const GallerySchema = new Schema({
  title: { type: String, required: true },
  images: [{ type: String }], // URL or path to the images
  gender: { type: mongoose.Schema.Types.ObjectId, ref: "Gender" }, // Referencing Gender schema
});

export const Gallery = models?.Gallery || model("Gallery", GallerySchema);