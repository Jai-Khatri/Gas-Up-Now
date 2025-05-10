import Order from "../model/order.model.js";
import User from "../model/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const adminLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ 
            message: "Email and password are required" 
        });
    }

    try {
        const admin = await User.findOne({ email, role: 'Admin' });
        if (!admin) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
             { id: admin._id, role: admin.role }, 
             process.env.JWT_SECRET,
             { expiresIn: '8h' }
         );

        const adminData = admin.toObject();
        delete adminData.password;

        res.status(200).json({
            message: "Admin login successful",
            token,
            admin: adminData
        });
    } catch (error) {
        console.error("Error in adminLogin:", error);
        res.status(500).json({ 
            message: "Internal server error",
            error: error.message 
        });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .sort({ createdAt: -1 })
            .populate('customer', 'name email'); 

        res.status(200).json({ 
            count: orders.length,
            orders 
        });
    } catch (error) {
        console.error("Error in getAllOrders:", error);
        res.status(500).json({ 
            message: "Internal server error",
            error: error.message 
        });
    }
};

export const updateOrderStatus = async (req, res) => {
    const { orderId } = req.params;
    const { status: orderStatus } = req.body;

    if (!orderId || !orderStatus) {
        return res.status(400).json({ 
            message: "Order ID and status are required" 
        });
    }

    if (!['Pending', 'Confirmed', 'Dispatched', 'Delivered', 'Cancelled'].includes(orderStatus)) {
        return res.status(400).json({ 
            message: "Invalid order status" 
        });
    }

    try {
        const order = await Order.findById(orderId).populate('customer', 'name email');
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        if (order.orderStatus === 'Cancelled' || order.orderStatus === 'Delivered') {
            return res.status(400).json({ 
                message: `Cannot update ${order.orderStatus} orders` 
            });
        }

        order.orderStatus = orderStatus;
        await order.save();

        res.status(200).json({ 
            message: "Order status updated successfully", 
            order 
        });
    } catch (error) {
        console.error("Error in updateOrderStatus:", error);
        res.status(500).json({ 
            message: "Internal server error",
            error: error.message 
        });
    }
};


export const updatePaymentStatus = async (req, res) => {
    const { orderId } = req.params;
    const { paymentStatus } = req.body;

    if (!orderId || !paymentStatus) {
        return res.status(400).json({ 
            message: "Order ID and payment status are required" 
        });
    }

    if (!['Pending', 'Paid', 'Failed', 'Refunded'].includes(paymentStatus)) {
        return res.status(400).json({ 
            message: "Invalid payment status" 
        });
    }

    try {
        const order = await Order.findById(orderId).populate('customer', 'name email'); 
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        if (order.paymentMethod === 'Cash on Delivery' && paymentStatus === 'Paid') {
            return res.status(400).json({ 
                message: "COD orders cannot be marked as Paid" 
            });
        }

        order.paymentStatus = paymentStatus;
        await order.save();

        res.status(200).json({ 
            message: "Payment status updated successfully", 
            order 
        });
    } catch (error) {
        console.error("Error in updatePaymentStatus:", error);
        res.status(500).json({ 
            message: "Internal server error",
            error: error.message 
        });
    }
};
