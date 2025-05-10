import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

export const authenticateJWT = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authorization token missing" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error("JWT Verification Failed:", err);
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};

export const checkAdminRole = (req, res, next) => {
    if (req.user?.role === "Admin") {
        return next();
    }
    return res.status(403).json({ message: "Admin access required" });
};

export const checkMemberRole = (req, res, next) => {
    if (req.user?.role === "Member") {
        return next();
    }
    return res.status(403).json({ message: "Member access required" });
};
