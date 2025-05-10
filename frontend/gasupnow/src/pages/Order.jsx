import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import { useAuthStore } from '../stores/useAuthStore';
import toast from 'react-hot-toast';

const Order = () => {
  const createOrder = useAuthStore((state) => state.createOrder);
  const user = useAuthStore((state) => state.user);

  const [formData, setFormData] = useState({
    deliveryAddress: '',
    quantity: 1,
    cylinderType: 'Domestic',
    paymentMethod: 'Cash on Delivery',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.deliveryAddress || !formData.quantity || !formData.paymentMethod) {
      toast.error('All fields are required.');
      return;
    }

    const orderPayload = {
      deliveryAddress: formData.deliveryAddress,
      quantity: formData.quantity,
      cylinderType: formData.cylinderType,
      paymentMethod: formData.paymentMethod,
    };

    await createOrder(orderPayload);
  };

  const calculateTotalPrice = () => {
    const pricePerCylinder = formData.cylinderType === 'Domestic' ? 15 : 25;
    return pricePerCylinder * formData.quantity;
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-[#434343] text-white">
      <section className="text-center px-6 py-20 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Order Your <span className="text-red-500">Gas Cylinder</span>
        </h1>
        <p className="text-lg text-gray-300">
          Fill out the form below to order a gas cylinder. Fast and reliable delivery, right to your doorstep.
        </p>
      </section>

      <section className="px-6 py-12 max-w-4xl mx-auto bg-[#1f1f1f] rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-1">Delivery Address</label>
            <input
              type="text"
              name="deliveryAddress"
              value={formData.deliveryAddress}
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-gray-800 border border-gray-600 text-white"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              min="1"
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-gray-800 border border-gray-600 text-white"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Cylinder Type</label>
            <select
              name="cylinderType"
              value={formData.cylinderType}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-800 border border-gray-600 text-white"
            >
              <option value="Domestic">Domestic</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Payment Method</label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-800 border border-gray-600 text-white"
            >
              <option value="Cash on Delivery">Cash on Delivery</option>
              <option value="QR Code">QR Code</option>
            </select>
          </div>

          <div className="text-lg text-gray-200">
            <p>
              <span className="text-red-400 font-semibold">Total Price:</span> ${calculateTotalPrice()}
            </p>
          </div>

          {formData.paymentMethod === 'QR Code' && (
            <div className="mt-6 text-center">
              <p className="text-gray-400 mb-2">Scan the QR to complete your payment:</p>
              <div className="inline-block p-4 bg-white rounded">
                <QRCode value={`Payment for $${calculateTotalPrice()}`} size={128} />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 px-6 bg-red-600 hover:bg-red-700 text-white font-bold rounded"
          >
            Place Order
          </button>
        </form>
      </section>
    </div>
  );
};

export default Order;
