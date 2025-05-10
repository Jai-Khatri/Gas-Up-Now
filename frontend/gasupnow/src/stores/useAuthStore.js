import { create } from 'zustand';
import axiosInstance from '../lib/axios.js';
import { toast } from 'react-hot-toast';

export const useAuthStore = create((set, get) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  orders: [],
  currentOrder: null,
  loading: false,

  signup: async (formData) => {
    try {
      set({ loading: true });
      const res = await axiosInstance.post('/api/member/signup', formData);
      const { user, token } = res.data;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      set({ user, token });
      toast.success('Signup successful');
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed');
      return false;
    } finally {
      set({ loading: false });
    }
  },
  
  login: async (credentials) => {
  try {
    set({ loading: true });
    const res = await axiosInstance.post('/api/member/login', credentials);
    const { user, token } = res.data;

    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    set({ user, token });
    toast.success('Login successful');
    return true;
  } catch (err) {
    toast.error(err.response?.data?.message || 'Login failed');
    return false;
  } finally {
    set({ loading: false });
  }
},
  
  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    delete axiosInstance.defaults.headers.common['Authorization'];
    set({ user: null, token: null, orders: [], currentOrder: null });
    toast.success('Logged out');
  },

  createOrder: async (orderData) => {
    try {
      const { token } = get();
      if (!token) {
        toast.error('Please login to create an order');
        return null;
      }

      set({ loading: true });
      
      const cylinderPrices = { Domestic: 15, Commercial: 25 };
      const pricePerCylinder = cylinderPrices[orderData.cylinderType] || 15;
      const totalPrice = pricePerCylinder * orderData.quantity;
      const paymentStatus = orderData.paymentMethod === 'QR Code' ? 'Paid' : 'Pending';

      const completeOrder = {
        ...orderData,
        totalPrice,
        paymentStatus
      };

      const res = await axiosInstance.post('/api/order/create', completeOrder, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      set(state => ({
        orders: [res.data.order, ...state.orders],
        currentOrder: res.data.order
      }));

      toast.success('Order created successfully!');
      return res.data.order;
    } catch (err) {
      console.error('Order creation error:', err.response?.data);
      toast.error(err.response?.data?.message || 'Failed to create order');
      return null;
    } finally {
      set({ loading: false });
    }
  },

  fetchOrders: async () => {
    try {
      const { token } = get();
      if (!token) return;

      set({ loading: true });
      const res = await axiosInstance.get('/api/order/get', {
        headers: { Authorization: `Bearer ${token}` },
      });

      set({ orders: res.data.orders });
    } catch (err) {
      console.error('Fetch orders error:', err);
      toast.error(err.response?.data?.message || 'Failed to fetch orders');
    } finally {
      set({ loading: false });
    }
  },

  fetchOrderById: async (id) => {
    try {
      const { token } = get();
      if (!token) return;

      set({ loading: true });
      const res = await axiosInstance.get(`/api/order/getOrder/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      set({ currentOrder: res.data.order });
      return res.data.order;
    } catch (err) {
      console.error('Fetch order error:', err);
      toast.error(err.response?.data?.message || 'Failed to fetch order details');
      return null;
    } finally {
      set({ loading: false });
    }
  }
}));

export default useAuthStore;