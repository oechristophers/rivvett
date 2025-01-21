import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "../auth/[...nextauth]";
import { Gender } from "@/models/Gender";

export default async function handler(req, res) {
  const { method } = req;
  await mongooseConnect();
  await isAdminRequest(req, res);

  if (method === "GET") {
    res.json(await Gender.find());
  }

  if (method === "POST") {
    const { name } = req.body;
    const genderDoc = await Gender.create({ name });
    res.json(genderDoc);
  }
  if (method === "PUT") {
    const { _id, name } = req.body;
    const genderDoc = await Gender.updateOne({ _id }, { name });
    res.json(genderDoc);
  }
  if (method === "DELETE") {
    const { _id } = req.query;
    await Gender.deleteOne({ _id });
    res.json("ok");
  }
}
