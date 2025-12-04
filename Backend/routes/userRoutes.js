import express from "express";
import { registerUser, loginUser, getCurrentUser } from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";
import User from "../models/User.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", protect, getCurrentUser);



export default router;
