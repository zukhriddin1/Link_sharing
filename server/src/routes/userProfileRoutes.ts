import express from "express";
import {
  createUserProfile,
  getUserProfile,
} from "../controllers/userProfileController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.post("/userprofiles", createUserProfile);
router.get("/userprofiles/:id", authMiddleware, getUserProfile);

export default router;
