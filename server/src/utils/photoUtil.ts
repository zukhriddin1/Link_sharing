import fs from "fs";

export const base64ToBuffer = (base64Data: string): Buffer => {
  const imageBuffer = Buffer.from(base64Data, "base64");
  return imageBuffer;
};

export const saveBufferToFile = (buffer: Buffer, filename: string) => {
  try {
    fs.writeFileSync(filename, buffer);
    console.log(`File saved: ${filename}`);
  } catch (error) {
    console.error(`Error saving file: ${error}`);
  }
};
