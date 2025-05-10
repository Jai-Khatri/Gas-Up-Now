import express from "express";
import { adminLogin,getAllOrders,updateOrderStatus,updatePaymentStatus} from "../controllers/admin.controller.js";
import { authenticateJWT, checkAdminRole } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", adminLogin);
router.get("/orders", authenticateJWT, checkAdminRole, getAllOrders);
router.put("/order/:orderId/status", authenticateJWT, checkAdminRole, updateOrderStatus);
router.put("/order/:orderId/payment-status", authenticateJWT, checkAdminRole, updatePaymentStatus);

export default router;