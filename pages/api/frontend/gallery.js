import { mongooseConnect } from "@/lib/mongoose";
import { Gallery } from "@/models/Gallery";


export default async function handler(req, res) {
  const { gender } = req.query;  // Gender parameter passed from client
  
  if (!gender) {
    return res.status(400).json({ message: "Gender is required" });
  }

  try {
    // Establish MongoDB connection
    await mongooseConnect();
    
    // Fetch the gallery by gender
    const gallery = await Gallery.find({ gender }).exec();
    
    // Return the gallery data
    res.status(200).json(gallery);
  } catch (error) {
    console.error("Error fetching gallery:", error);
    res.status(500).json({ message: "Error fetching gallery" });
  }
}
