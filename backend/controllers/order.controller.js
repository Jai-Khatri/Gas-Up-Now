import Order from "../model/order.model.js";
import User from "../model/user.model.js";

const CYLINDER_PRICES = {
    Domestic: 15,
    Commercial: 25,
};

export const createOrder = async (req, res) => {
    const { deliveryAddress, quantity, cylinderType = "Domestic", paymentMethod } = req.body;

    if (!deliveryAddress || !quantity || !paymentMethod) {
        return res.status(400).json({ 
            message: "Delivery address, quantity, and payment method are required." 
        });
    }

    if (quantity < 1) {
        return res.status(400).json({
            message: "At least one cylinder must be ordered"
        });
    }

    const pricePerCylinder = CYLINDER_PRICES[cylinderType] || CYLINDER_PRICES.Domestic;
    const totalPrice = pricePerCylinder * quantity;

    const paymentStatus = paymentMethod === "QR Code" ? "Paid" : "Pending";

    try {
        const newOrder = await Order.create({
            customer: req.user._id,
            deliveryAddress,
            quantity,
            cylinderType,
            totalPrice,
            paymentMethod,
            paymentStatus,
            orderStatus: "Pending"
        });

        await User.findByIdAndUpdate(
            req.user._id,
            { $push: { history: newOrder._id } },
            { new: true }
        );

        return res.status(201).json({ 
            message: "Order created successfully!", 
            order: newOrder 
        });
    } catch (error) {
        console.error("Error in createOrder:", error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ customer: req.user._id })
            .sort({ createdAt: -1 })
            .populate('customer', 'name email');

        return res.status(200).json({ orders });
    } catch (error) {
        console.error("Error in getMyOrders:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findOne({
            _id: req.params.id,
            customer: req.user._id
        }).populate('customer', 'name email');

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        return res.status(200).json({ order });
    } catch (error) {
        console.error("Error in getOrderById:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getAllOrders = async (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: "Unauthorized access" });
    }

    try {
        const orders = await Order.find()
            .sort({ createdAt: -1 })
            .populate('customer', 'name email');
        
        return res.status(200).json({ orders });
    } catch (error) {
        console.error("Error in getAllOrders:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};