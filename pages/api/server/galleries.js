import { mongooseConnect } from "@/lib/mongoose";
import { Gallery } from "@/models/Gallery";
import { isAdminRequest } from "../auth/[...nextauth]";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  await isAdminRequest(req, res);

  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Gallery.findOne({ _id: req.query.id }));
    } else {
      res.json(await Gallery.find());
    }
  }

  if (method === "POST") {
    const { title, images, gender } = req.body;
    const galleryDoc = await Gallery.create({ title, images, gender });
    res.json(galleryDoc);
  }
  if (method === "PUT") {
    const { _id, title, images, gender } = req.body;
    await Gallery.updateOne({ _id }, { title, images, gender });
    res.json(true);
  }
  if (method === "DELETE") {
    const { _id } = req.query;
    await Gallery.deleteOne({ _id });
    res.json("ok");
  }
}
