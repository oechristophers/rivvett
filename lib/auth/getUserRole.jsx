"use server";

import clientPromise from "../mongodb";
import { auth } from "./authConfig";
import { ObjectId } from "mongodb";

export const getUserRole = async () => {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized: No session found");
  }

  const userId = session.user.id;

  // Validate and convert userId to ObjectId
  let objectId;
  try {
    objectId = new ObjectId(userId);
  } catch (error) {
    throw new Error("Invalid ObjectId: User ID is not valid");
  }

  try {
    const client = await clientPromise;
    const db = client.db("test"); // Replace 'test' with your actual database name

    const result = await db.collection("users").findOne(
      { _id: objectId }, // Match the user by their ObjectId
      { projection: { role: 1 } } // Only fetch the 'role' field to optimize performance
    );

    return result?.role; // Return the user's role if found, or null if not
  } catch (error) {
    console.error("Failed to retrieve user role:", error.message);
    throw new Error("Internal Server Error");
  }
};
