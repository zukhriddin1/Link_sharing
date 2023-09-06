import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createPlatformName = async (req: Request, res: Response) => {
  try {
    const { name, link, user_id } = req.body;

    const platformName = await prisma.platformName.create({
      data: {
        name,
        link,
        user: { connect: { id: user_id } },
      },
    });

    res.json(platformName);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getPlatformName = async (req: Request, res: Response) => {
  try {
    const platformNameId = parseInt(req.params.id);

    const platformName = await prisma.platformName.findUnique({
      where: {
        id: platformNameId,
      },
    });

    if (!platformName) {
      return res.status(404).json({ error: "Platform name not found" });
    }

    res.json(platformName);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
