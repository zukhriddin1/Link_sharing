import express from "express";
import {
  createPlatformName,
  getPlatformName,
} from "../controllers/platformNameController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.post("/platformnames", createPlatformName);
router.get("/platformnames/:id", authMiddleware, getPlatformName);

export default router;
