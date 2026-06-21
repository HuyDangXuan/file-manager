import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

type UploadRequest = Request & {
  files?: unknown;
};

export const POSTuploadFile = (req: Request, res: Response) => {
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

export const PATCHchangeFileName = (req: Request, res: Response) => {
  try {
    const { folder, newFileName, oldFileName } = req.body;

    if (!folder || !newFileName || !oldFileName) {
      return res.json({
        code: "error",
        message: "Thiếu thông tin cần thiết",
      });
    }

    const cleanFolder = folder.replace("/", "");
    const mediaDir = path.join(__dirname, '..', cleanFolder);
    const oldFilePath = path.join(mediaDir, oldFileName);
    const newFilePath = path.join(mediaDir, newFileName);

    if (!fs.existsSync(oldFilePath)) {
      return res.json({
        code: "error",
        message: "File cũ không tồn tại",
      });
    }

    if (fs.existsSync(newFilePath)) {
      return res.json({
        code: "error",
        message: "File mới đã tồn tại",
      });
    }

    try {
      fs.renameSync(oldFilePath, newFilePath);
    } catch (error) {
      return res.json({
        code: "error",
        message: "Đổi tên file thất bại",
      });
    }

    res.json({
      code: "success",
      message: "Đổi tên file thành công",
    });
  } catch (error) {
    console.log(error);
    res.json({
      code: "error",
      message: "Lỗi hệ thống!",
    });
  }
};