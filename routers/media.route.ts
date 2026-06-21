import { Router } from "express";
import * as mediaController from "../controllers/media.controller";

const router = Router();

router.get(
  '/:filename', 
  mediaController.GETgetMedia
);

export default router;