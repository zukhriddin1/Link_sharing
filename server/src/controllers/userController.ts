import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { CustomRequest } from "../middleware/authMiddleware";

const prisma = new PrismaClient();

export const createUser = async (req: CustomRequest, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.create({
      data: {
        email,
        password,
      },
    });

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getUser = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.userId;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
