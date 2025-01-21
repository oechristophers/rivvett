import { useEffect, useState } from 'react';
import { mongooseConnect } from '@/lib/mongoose';
import { Users } from '@/models/Accounts';
import { getServerSession } from 'next-auth';
import Layout from './layout';
import { authOptions } from '../api/auth/[...nextauth]';
import { Order } from '@/models/Order';

export async function getServerSideProps(context) {
  await mongooseConnect();

  const { req, res } = context;
  const session = await getServerSession(req, res, authOptions);

  const userEmail = session.user.email;

  if (!userEmail) {
    return {
      redirect: {
        destination: '/auth/sign-in',
        permanent: false,
      },
    };
  }

  // Fetch the user's order history
  const user = await Users.findOne({ email: userEmail })
    .populate('orderHistory.orderId') // Populate order details
    .select('orderHistory'); // Only fetch the `orderHistory` field

  if (!user) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      orderHistory: JSON.parse(JSON.stringify(user.orderHistory)), // Serialize data for Next.js
    },
  };
}

export default function OrdersPage({ orderHistory }) {
  const [orders, setOrders] = useState(orderHistory);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Function to fetch updated order data
  const fetchUpdatedOrders = async () => {
    const res = await fetch('/api/frontend/fetchOrderHistory'); // Create an API route to fetch updated orders
    const data = await res.json();
    setOrders(data.orderHistory);
  };

  useEffect(() => {
    // Set interval to refresh data every minute (60,000 ms)
    const intervalId = setInterval(() => {
      fetchUpdatedOrders();
    }, 60000);

    // Cleanup interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = orders.slice(startIndex, endIndex);

  const totalPages = Math.ceil(orders.length / itemsPerPage);

  return (
    <Layout>
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor:'white' }}>
        <h1>My Orders</h1>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div>
            {currentOrders.map((order, index) => (
              <div
                key={index}
                style={{
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '16px',
                  marginBottom: '16px',
                }}
              >
                <h2>Order ID: {order.orderId?._id || 'N/A'}</h2>
                <p>
                  <strong>Status:</strong> {order.status}
                </p>
                <p>
                  <strong>Tracking Number:</strong>{' '}
                  {order.trackingNumber || 'Not Available'}
                </p>
                <p>
                  <strong>Estimated Delivery Date:</strong>{' '}
                  {order.estimatedDeliveryDate
                    ? new Date(order.estimatedDeliveryDate).toLocaleDateString()
                    : 'Not Available'}
                </p>
                <p>
                  <strong>Next Update:</strong>{' '}
                  {order.nextUpdateAt
                    ? new Date(order.nextUpdateAt).toLocaleString()
                    : 'Not Scheduled'}
                </p>
                <p>
                  <strong>Total:</strong> ${order?.total?.toFixed(2)}
                </p>
                <p>
                  <strong>Order Placed:</strong>{' '}
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleString()
                    : 'Unknown'}
                </p>
              </div>
            ))}

            {/* Pagination Controls */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '10px',
                marginTop: '20px',
              }}
            >
              {currentPage > 1 && (
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  style={{
                    padding: '8px 12px',
                    cursor: 'pointer',
                    backgroundColor: currentPage === 1 ? '#ccc' : '#000',
                    color: '#fff',
                    borderRadius: '4px',
                    border: 'none',
                  }}
                >
                  Previous
                </button>
              )}

              <p style={{ padding: '8px 12px' }}>
                Page {currentPage} of {totalPages}
              </p>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                style={{
                  padding: '8px 12px',
                  cursor: 'pointer',
                  backgroundColor: currentPage === totalPages ? '#ccc' : '#000',
                  color: '#fff',
                  borderRadius: '4px',
                  border: 'none',
                }}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
