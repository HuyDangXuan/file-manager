import { Router } from "express";
import * as fileManagerController from "../controllers/file-manager.controller";
import multer from "multer";

const upload = multer();

const router = Router();

router.post(
  '/upload', 
  upload.array('files'), 
  fileManagerController.POSTuploadFile
);

router.patch(
  '/change-file-name',
  upload.none(),
  fileManagerController.PATCHchangeFileName
);

router.patch(
  '/delete-file',
  upload.none(),
  fileManagerController.PATCHdeleteFile
);

router.post(
  '/folder/create',
  upload.none(),
  fileManagerController.POSTcreateFolder
);

router.get(
  '/folder/list',
  upload.none(),
  fileManagerController.GETlistFolder
);

router.patch(
  '/folder/delete',
  upload.none(),
  fileManagerController.PATCHdeleteFolder
);

export default router;