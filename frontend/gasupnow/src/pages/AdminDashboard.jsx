import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminStore } from '../stores/useAdminStore';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const {
    admin,
    orders,
    loading,
    fetchAllOrders,
    updateOrderStatus,
    updatePaymentStatus,
    logout,
  } = useAdminStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (!admin) {
      toast.error('You must be an admin to access this page');
      navigate('/admin-dashboard');
      return;
    }
    fetchAllOrders();
  }, [admin, fetchAllOrders, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const statusOptions = ['Pending', 'Confirmed', 'Dispatched', 'Delivered', 'Cancelled'];
  const paymentOptions = ['Pending', 'Paid', 'Failed', 'Refunded'];

  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-[#434343] text-white">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>

        {loading && <p className="text-lg font-medium">Loading orders...</p>}

        {!loading && orders.length === 0 && (
          <p className="text-lg font-medium text-gray-600">No orders found.</p>
        )}

        {!loading && orders.length > 0 && (
          <div className="overflow-x-auto bg-[#2d2d2d] rounded shadow-md">
            <table className="min-w-full divide-y divide-gray-300 text-sm">
              <thead className="bg-gradient-to-r from-black to-[#434343] text-white font-bold text-left">
                <tr>
                  <th className="px-4 py-2">Order ID</th>
                  <th className="px-4 py-2">Customer</th>
                  <th className="px-4 py-2">Order Status</th>
                  <th className="px-4 py-2">Payment Status</th>
                  <th className="px-4 py-2">Update Status</th>
                  <th className="px-4 py-2">Update Payment</th>
                  <th className="px-4 py-2">User Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-500">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-700">
                    <td className="px-4 py-2">{order._id}</td>
                    <td className="px-4 py-2">{order.customer?.name || 'N/A'}</td>
                    <td className="px-4 py-2">{order.orderStatus}</td>
                    <td className="px-4 py-2">{order.paymentStatus}</td>
                    <td className="px-4 py-2">
                      <select
                        defaultValue={order.orderStatus}
                        onChange={(e) => {
                          updateOrderStatus(order._id, e.target.value);
                        }}
                        className="bg-[#2d2d2d] border px-2 py-1 rounded text-white"
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-2">
                      <select
                        defaultValue={order.paymentStatus}
                        onChange={(e) => updatePaymentStatus(order._id, e.target.value)}
                        className="bg-[#2d2d2d] border px-2 py-1 rounded text-white"
                      >
                        {paymentOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-2">
                      <span className="bg-gray-800 px-3 py-1 rounded text-sm">
                        {order.user?.role || 'Member'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
