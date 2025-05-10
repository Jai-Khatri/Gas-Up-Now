import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  deliveryAddress: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, "At least one cylinder must be ordered"],
  },
  cylinderType: {
    type: String,
    enum: ["Domestic", "Commercial"], 
    default: "Domestic",
  },
  orderStatus: {
    type: String,
    enum: ["Pending", "Confirmed", "Dispatched", "Delivered", "Cancelled"],
    default: "Pending",
  },
  totalPrice: {
    type: Number,
    required: true,
    min: [0, "Total price must be non-negative"],
  },
  paymentMethod: {
    type: String,
    enum: ["Cash on Delivery", "QR Code"],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid", "Failed", "Refunded"],
    default: "Pending"
  }
}, { timestamps: true, versionKey: false });

const Order = mongoose.model("Order", OrderSchema);

export default Order;
