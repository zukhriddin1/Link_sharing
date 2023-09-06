import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient();

export const createUserProfile = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, photo, email, user_id } = req.body;

    if (photo) {
      const filename = `${user_id}_photo.jpg`;
      savePhoto(photo, filename);
    }

    const userProfile = await prisma.userProfil.create({
      data: {
        firstName,
        lastName,
        photo: photo ? `path/to/photos/${user_id}_photo.jpg` : null,
        email,
        user_id,
      },
    });

    res.json(userProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const userProfileId = parseInt(req.params.id);

    const userProfile = await prisma.userProfil.findUnique({
      where: {
        id: userProfileId,
      },
    });

    if (!userProfile) {
      return res.status(404).json({ error: "User profile not found" });
    }

    res.json(userProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const savePhoto = (base64Data: string, filename: string) => {
  try {
    const imageBuffer = Buffer.from(base64Data, "base64");
    fs.writeFileSync(filename, imageBuffer);
    console.log(`Photo saved: ${filename}`);
  } catch (error) {
    console.error(`Error saving photo: ${error}`);
  }
};
