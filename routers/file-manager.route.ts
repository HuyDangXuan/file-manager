import { Router } from "express";
import * as fileManagerController from "../controllers/file-manager.controller";
import multer from "multer";

const upload = multer();

const router = Router();

router.post(
  '/upload', 
  upload.array('files'), 
  fileManagerController.uploadFile
);

export default router;