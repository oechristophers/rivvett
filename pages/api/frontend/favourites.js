import { getServerSession } from 'next-auth';
import { mongooseConnect } from '@/lib/mongoose';
import { Users } from '@/models/Accounts';
import mongoose from 'mongoose';
import { authOptions } from '../auth/[...nextauth]'; // import authOptions from where it's defined

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // POST request logic
    try {
      // Extract session from request
      const session = await getServerSession(req, res, authOptions);

      if (!session) {
        return res
          .status(401)
          .json({ message: 'Unauthorized: No session found' });
      }

      const { baseId, color = null, size = null, quantity = 1 } = req.body;
      const userId = session.user.id; // Getting userId from session

      if (!baseId) {
        return res
          .status(400)
          .json({ message: 'Missing required fields: baseId' });
      }

      if (!userId) {
        return res
          .status(402)
          .json({ message: 'Missing required fields: userId' });
      }

      await mongooseConnect();
      console.log('Connected to MongoDB');

      // Validate ObjectId
      if (
        !mongoose.Types.ObjectId.isValid(baseId) ||
        !mongoose.Types.ObjectId.isValid(userId)
      ) {
        return res.status(400).json({ message: 'Invalid baseId or userId' });
      }

      const user = await Users.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.wishlist = user.wishlist || []; // Ensure wishlist is initialized

      const wishlistIndex = user.wishlist.findIndex(
        (item) =>
          item.productId.toString() === baseId &&
          item.properties?.color === color &&
          item.properties?.size === size,
      );

      if (wishlistIndex > -1) {
        // Update quantity or remove if quantity <= 0
        if (quantity > 0) {
          user.wishlist[wishlistIndex].quantity = quantity;
        } else {
          user.wishlist.splice(wishlistIndex, 1);
        }
      } else {
        // Add new item if quantity > 0
        if (quantity > 0) {
          user.wishlist.push({
            productId: baseId,
            quantity,
            properties: { color, size },
          });
        }
      }

      await user.save();
      return res.status(200).json({
        message:
          wishlistIndex > -1
            ? quantity > 0
              ? 'Item updated in wishlist'
              : 'Item removed from wishlist'
            : 'Item added to wishlist',
        wishlist: user.wishlist,
      });
    } catch (error) {
      console.error('Error updating wishlist:', error);
      return res
        .status(500)
        .json({ message: 'Internal server error', error: error.message });
    }
  }

  if (req.method === 'DELETE') {
    // DELETE request logic
    try {
      // Get session info
      const session = await getServerSession(req, res, authOptions);

      if (!session) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const userId = session.user.id;
      const { wishId } = req.body; // Assuming the wish ID is passed in the request body

      // Ensure the database connection
      await mongooseConnect();

      // Find the user
      const user = await Users.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Remove the wish from the wishlist by its _id
      const updatedWishlist = user.wishlist.filter(
        (item) => item._id.toString() !== wishId,
      );

      // Update the user's wishlist in the database
      user.wishlist = updatedWishlist;
      await user.save();

      // Return the updated wishlist
      return res.status(200).json({ wishlist: updatedWishlist });
    } catch (error) {
      console.error('Error in DELETE request:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    // Handle unsupported methods
    res.setHeader('Allow', ['POST', 'DELETE']);
    return res
      .status(405)
      .json({ message: `Method ${req.method} Not Allowed` });
  }
}
