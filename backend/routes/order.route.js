import express from "express";
import { authenticateJWT,  checkMemberRole } from "../middleware/auth.js"; 
import { createOrder, getMyOrders, getOrderById } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/create", authenticateJWT, checkMemberRole, createOrder); 
router.get("/get", authenticateJWT, checkMemberRole, getMyOrders);
router.get("/getOrder/:id", authenticateJWT, checkMemberRole, getOrderById); 

export default router;
