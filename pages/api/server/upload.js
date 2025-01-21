import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import multiparty from "multiparty";
import fs from "fs";
import app from "../../../firebase"; // Adjust the path to your firebase config
import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "../auth/[...nextauth]";

export default async function handle(req, res) {
  await mongooseConnect();
  await isAdminRequest(req, res);

  const form = new multiparty.Form();
  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });

  const storage = getStorage(app);
  const fileLinks = [];

  for (const file of files.file) {
    const fileBuffer = fs.readFileSync(file.path);
    const fileName = new Date().getTime() + "-" + file.originalFilename;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, fileBuffer);

    await new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        null,
        (error) => reject(error),
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          fileLinks.push(downloadURL);
          resolve();
        }
      );
    });
  }

  return res.status(200).json({ fileLinks });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
