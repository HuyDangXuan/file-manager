import { Router } from "express";
import fileManagerRouter from "./file-manager.route";

const router = Router();

router.use('/file-manager', fileManagerRouter);

export default router;