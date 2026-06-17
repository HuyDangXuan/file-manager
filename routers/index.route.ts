import { Router } from "express";
import fileManagerRouter from "./file-manager.route";
import mediaManagerRouter from "./media.route";

const router = Router();

router.use('/file-manager', fileManagerRouter);
router.use('/media', mediaManagerRouter);

export default router;