import { useEffect, useState } from 'react';
import { useAuthStore } from '../stores/useAuthStore.js';
import { format } from 'date-fns';
import { FaEye } from 'react-icons/fa';

const MemberDashboard = () => {
  const {
    user,
    orders,
    currentOrder,
    fetchOrders,
    fetchOrderById,
    loading,
  } = useAuthStore();

  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (selectedOrderId) fetchOrderById(selectedOrderId);
  }, [selectedOrderId]);

  return (
    <div className="min-h-screen text-white" style={{ background: 'linear-gradient(to right, #000000, #434343)' }}>
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-red-500 mb-6">Welcome, {user?.name || 'Member'}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="bg-black bg-opacity-30 p-4 rounded-lg shadow-md border border-red-600">

            <h2 className="text-xl font-semibold mb-4 text-red-400">Your Orders</h2>

            {loading && <p className="text-gray-300">Loading orders...</p>}
            {!loading && orders?.length === 0 && (
              <p className="text-gray-400">You haven’t placed any orders yet.</p>
            )}

            <ul className="space-y-3 max-h-[400px] overflow-y-auto">
              {orders.map((order) => (
                <li
                  key={order._id}
                  className={`p-4 border border-gray-600 rounded-lg flex justify-between items-center hover:bg-gray-800 cursor-pointer ${
                    selectedOrderId === order._id ? 'bg-gray-800' : ''
                  }`}
                  onClick={() => setSelectedOrderId(order._id)}
                >
                  <div>
                    <p className="text-sm">Order ID: <span className="text-red-400">{order._id.slice(0, 8)}...</span></p>
                    <p className="text-sm">Status: <span className="font-medium text-red-300">{order.orderStatus}</span></p>
                    <p className="text-sm text-gray-400">{format(new Date(order.createdAt), 'PPP p')}</p>
                  </div>
                  <FaEye className="text-red-400 text-lg" />
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-black bg-opacity-30 p-4 rounded-lg shadow-md border border-red-600">
            
            <h2 className="text-xl font-semibold mb-4 text-red-400">Order Details</h2>
            {loading && <p className="text-gray-300">Loading order details...</p>}
            {!loading && currentOrder ? (
              <div className="space-y-2 text-sm text-gray-200">
                <p><span className="text-red-400 font-medium">Order ID:</span> {currentOrder._id}</p>
                <p><span className="text-red-400 font-medium">Cylinder Type:</span> {currentOrder.cylinderType}</p>
                <p><span className="text-red-400 font-medium">Quantity:</span> {currentOrder.quantity}</p>
                <p><span className="text-red-400 font-medium">Delivery Address:</span> {currentOrder.deliveryAddress}</p>
                <p><span className="text-red-400 font-medium">Payment Method:</span> {currentOrder.paymentMethod}</p>
                <p><span className="text-red-400 font-medium">Payment Status:</span> {currentOrder.paymentStatus}</p>
                <p><span className="text-red-400 font-medium">Order Status:</span> {currentOrder.orderStatus}</p>
                <p><span className="text-red-400 font-medium">Total Price:</span> ${currentOrder.totalPrice}</p>
                <p><span className="text-red-400 font-medium">Placed At:</span> {format(new Date(currentOrder.createdAt), 'PPP p')}</p>
              </div>
            ) : (
              !loading && <p className="text-gray-400">Click an order to view its details.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;
