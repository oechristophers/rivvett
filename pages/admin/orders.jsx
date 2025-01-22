import axios from 'axios';
import { useEffect, useState } from 'react';
import Layout from './layout';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios.get('/api/server/orders').then((response) => {
      setOrders(response.data);
    });
  }, []);
  return (
    <Layout>
      <h1>Orders Page</h1>
      <table className="basic mt-4 ">
        <thead>
          <tr>
            <td>Date</td>
            <td>Status</td>
            <td>Recipient Info</td>
            <td>Products</td>
            {/* <td>Total Amount</td> */}
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 &&
            orders.map((order) => (
              <tr key={order._id}>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td>
                  <span
                    className={
                      order.paid
                        ? 'text-green-800 border bg-green-300  px-2 rounded-lg py-[0.15rem]'
                        : 'text-yellow-700 bg-yellow-200 px-2 py-[0.15rem] rounded-lg'
                    }
                  >
                    {order.paid ? 'Succeed' : 'Pending'}
                  </span>
                </td>
                <td>
                  {order.name} {order.email} <br />
                  {order.city}, {order.postalCode} {order.country} <br />
                  {order.streetAddress}
                </td>
                <td>
                  {order.line_items.map((l) => (
                    <>
                      {l.price_data?.product_data?.name} X {l.quantity}
                      <br />
                    </>
                  ))}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}
