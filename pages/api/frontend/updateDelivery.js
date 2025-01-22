import { mongooseConnect } from '@/lib/mongoose';
import { Order } from '@/models/Order';
import { Users } from '@/models/Accounts'; // Ensure you import your User model

// Helper function to determine the next status and next update time
function getNextStatusAndTime(currentStatus, currentTime) {
  let newStatus;
  let nextUpdateAt;

  switch (currentStatus) {
    case 'Order Placed':
      newStatus = 'Processing';
      nextUpdateAt = new Date(currentTime.getTime() + 60 * 1000); // 1 min
      break;

    case 'Processing':
      newStatus = 'In Transit';
      nextUpdateAt = new Date(currentTime.getTime() + 60 * 1000); // 1 min
      break;

    case 'In Transit':
      newStatus = 'Out For Delivery';
      nextUpdateAt = new Date(currentTime.getTime() + 60 * 1000); // 1 min
      break;

    case 'Out For Delivery':
      newStatus = 'Delivered';
      nextUpdateAt = null; // Final state
      break;

    default:
      newStatus = currentStatus;
      nextUpdateAt = currentTime;
      break;
  }

  return { newStatus, nextUpdateAt };
}

// Main handler function
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }

  try {
    await mongooseConnect();
    const now = new Date();

    // Fetch orders where updates are due
    const ordersToUpdate = await Order.find({
      'deliveryDetails.nextUpdateAt': { $lte: now },
      'deliveryDetails.status': { $ne: 'Delivered' }, // Exclude delivered orders
    });

    if (!ordersToUpdate.length) {
      return res.json({ success: true, message: 'No orders to update.' });
    }

    const updatedOrders = [];

    // Process each order to update
    for (const order of ordersToUpdate) {
      const { status, trackingNumber, estimatedDeliveryDate, nextUpdateAt } =
        order.deliveryDetails;

      // Get next status and next update time
      const { newStatus, nextUpdate } = getNextStatusAndTime(status, now);

      // Update the delivery details in the Order document
      const updatedOrder = await Order.findByIdAndUpdate(
        order._id,
        {
          'deliveryDetails.status': newStatus,
          'deliveryDetails.nextUpdateAt': nextUpdate,
        },
        { new: true },
      );

      if (updatedOrder) {
        updatedOrders.push(updatedOrder);

        // Update the user's orderHistory
        const user = await Users.findOne({ email: updatedOrder.email });
        if (user) {
          // Directly update the specific order in the user's orderHistory by matching the orderId
          await Users.updateOne(
            { _id: user._id, 'orderHistory.orderId': order._id },
            {
              $set: {
                'orderHistory.$.status': newStatus,
                'orderHistory.$.nextUpdateAt': nextUpdate,
              },
            },
          );
        }
      }
    }

    return res.json({ success: true, updatedOrders });
  } catch (error) {
    console.error('Error updating orders:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
