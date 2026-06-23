import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

const mediaRoot = path.resolve(process.cwd(), 'media');

type UploadRequest = Request & {
  files?: unknown;
};

export const POSTuploadFile = (req: Request, res: Response) => {
  try {
    const file = req.files as Express.Multer.File[];

    const savedLinks: any[] = [];

    const mediaDir = mediaRoot;

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
    const mediaDir = path.resolve(mediaRoot, cleanFolder);
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

export const PATCHdeleteFile = (req: Request, res: Response) => {
  try {
    const { folder, fileName } = req.body;

    if (!folder || !fileName) {
      return res.json({
        code: "error",
        message: "Thiếu thông tin cần thiết",
      });
    }

    const cleanFolder = folder.replace("/", "");
    const mediaDir = path.resolve(mediaRoot, cleanFolder);
    const filePath = path.join(mediaDir, fileName);

    if (!fs.existsSync(filePath)) {
      return res.json({
        code: "error",
        message: "File không tồn tại",
      });
    }

    try {
      fs.unlinkSync(filePath);
    } catch (error) {
      return res.json({
        code: "error",
        message: "Xóa file thất bại",
      });
    }

    res.json({
      code: "success",
      message: "Xóa file thành công",
    });
  } catch (error) {
    console.log(error);
    res.json({
      code: "error",
      message: "Lỗi hệ thống!",
    });
  }
};

export const POSTcreateFolder = (req: Request, res: Response) => {
  try {
    const { folderName } = req.body;

    if (!folderName) {
      return res.json({
        code: "error",
        message: "Thiếu thông tin cần thiết",
      });
    }

    const mediaRoot = path.join(__dirname, '..', 'media');
    const folderPath = path.join(mediaRoot, folderName);

    if (fs.existsSync(folderPath)) {
      return res.json({
        code: "error",
        message: "Thư mục đã tồn tại",
      });
    }

    fs.mkdirSync(folderPath, { recursive: true });
    res.json({
      code: "success",
      message: "Tạo thư mục thành công",
    });
  } catch (error) {
    console.log(error);
    res.json({
      code: "error",
      message: "Lỗi hệ thống!",
    });
  }
}

export const GETlistFolder = (req: Request, res: Response) => {
  try {
    const mediaRoot = path.join(__dirname, '..', 'media');
    const folders = fs.readdirSync(mediaRoot, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => {
        const folderPath = path.join(mediaRoot, dirent.name);
        const stats = fs.statSync(folderPath);
        return {
          name: dirent.name,
          createdAt: stats.birthtime,
        };
      }).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    res.json({
      code: "success",
      message: "Lấy danh sách thư mục thành công",
      folders: folders,
    });
  } catch (error) {
    console.log(error);
    res.json({
      code: "error",
      message: "Lỗi hệ thống!",
    });
  }
}