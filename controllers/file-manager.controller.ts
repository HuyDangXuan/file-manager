import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

type UploadRequest = Request & {
  files?: unknown;
};

export const uploadFile = (req: Request, res: Response) => {
  try {
    const file = req.files as Express.Multer.File[];

    const savedLinks: any[] = [];

    const mediaDir = path.join(__dirname, '../media');

    file.forEach((file) => {
      const fileName = `${Date.now()}-${file.originalname}`;
      const filePath = path.join(mediaDir, fileName);
      fs.writeFileSync(filePath, file.buffer);
      savedLinks.push({
        folder: '/media',
        filename: fileName,
        mimetype: file.mimetype,
        size: file.size,
      });
    });

    res.json({
      code: "success",
      message: "Upload thành công",
      savedLinks: savedLinks,
    });
  } catch (error) {
    console.log(error);
    res.json({
      code: "error",
      message: "Upload thất bại",
    });
  }
};