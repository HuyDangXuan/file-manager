import { Router } from "express";
import * as mediaController from "../controllers/media.controller";

const router = Router();

router.get(
  '/:filename', 
  mediaController.getMedia
);

export default router;