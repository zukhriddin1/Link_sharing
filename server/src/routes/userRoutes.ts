import express from "express";
import { createUser, getUser } from "../controllers/userController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.get("/users/:id", authMiddleware, getUser);
router.post("/users", createUser);

export default router;
