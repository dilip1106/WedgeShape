import express from "express";
import { signup,login,logout,resetPassword, checkAuth, verifyEmail, forgotPassword,fetchAllUsers} from "../controllers/auth.controller.js";
import { authenticateUser, verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/check-auth",verifyToken,checkAuth)

router.get("/student",fetchAllUsers)
router.post("/signup",signup);
router.post("/login",login);
router.post("/logout", verifyToken,logout);

router.post("/verify-email",verifyEmail);
router.post("/forgot-password",forgotPassword);

router.post("/reset-password/:token", resetPassword);

export default router;