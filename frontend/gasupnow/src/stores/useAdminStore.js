import { create } from 'zustand';
import axiosInstance from '../lib/axios.js';
import { toast } from 'react-hot-toast';

export const useAdminStore = create((set, get) => ({
  admin: JSON.parse(localStorage.getItem('admin')) || null,
  token: localStorage.getItem('token') || null,
  orders: [],
  loading: false,

  login: async (credentials) => {
    try {
      set({ loading: true });
      const res = await axiosInstance.post('/api/admin/login', credentials);
      const { admin, token } = res.data;

      if (admin.role !== 'Admin') {
        throw new Error('Admin access required');
      }

      localStorage.setItem('admin', JSON.stringify(admin));
      localStorage.setItem('token', token);

      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      set({ admin, token });
      toast.success('Admin login successful');
      return true;
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Admin login failed');
      return false;
    } finally {
      set({ loading: false });
    }
  },

  logout: () => {
    localStorage.removeItem('admin');
    localStorage.removeItem('token');
    delete axiosInstance.defaults.headers.common['Authorization'];
    set({ admin: null, token: null, orders: [] });
    toast.success('Admin logged out successfully');
  },

  fetchAllOrders: async () => {
    try {
      set({ loading: true });
      const { token } = get();
      if (!token) throw new Error('Admin not logged in');

      const res = await axiosInstance.get('/api/admin/orders');
      set({ orders: res.data.orders });
    } catch (err) {
      console.error('Fetch orders error:', err?.response?.data);
      toast.error(err?.response?.data?.message || 'Failed to fetch orders');
    } finally {
      set({ loading: false });
    }
  },

  updateOrderStatus: async (orderId, orderStatus) => {
    try {
      if (!['Pending', 'Confirmed', 'Dispatched', 'Delivered', 'Cancelled'].includes(orderStatus)) {
        throw new Error('Invalid order status');
      }

      set({ loading: true });
      const { token } = get();
      if (!token) throw new Error('Admin not logged in');

      console.log('Sending order status:', orderStatus);

      await axiosInstance.put(`/api/admin/order/${orderId}/status`, { status: orderStatus });

      set((state) => ({
        orders: state.orders.map((order) =>
          order._id === orderId ? { ...order, orderStatus } : order
        ),
      }));

      toast.success(`Order status updated to ${orderStatus}`);
    } catch (err) {
      console.error('Update status error:', err?.response?.data);
      toast.error(err?.response?.data?.message || 'Failed to update order status');
      get().fetchAllOrders(); 
    } finally {
      set({ loading: false });
    }
  },

  updatePaymentStatus: async (orderId, paymentStatus) => {
    try {
      if (!['Pending', 'Paid', 'Failed', 'Refunded'].includes(paymentStatus)) {
        throw new Error('Invalid payment status');
      }

      set({ loading: true });
      const { token } = get();
      if (!token) throw new Error('Admin not logged in');

      await axiosInstance.put(`/api/admin/order/${orderId}/payment-status`, { paymentStatus });

      set((state) => ({
        orders: state.orders.map((order) =>
          order._id === orderId ? { ...order, paymentStatus } : order
        ),
      }));

      toast.success(`Payment status updated to ${paymentStatus}`);
    } catch (err) {
      console.error('Update payment error:', err?.response?.data);
      toast.error(err?.response?.data?.message || 'Failed to update payment status');
      get().fetchAllOrders(); 
    } finally {
      set({ loading: false });
    }
  },
}));

export default useAdminStore;
