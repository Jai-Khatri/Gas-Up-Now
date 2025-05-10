import express from "express";
import { createMember, loginMember } from "../controllers/member.controller.js";

const router = express.Router();

router.post("/signup", createMember);
router.post("/login", loginMember);

export default router;
