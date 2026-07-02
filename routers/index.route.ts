import { Router } from "express";
import fileManagerRouter from "./file-manager.route";
import mediaManagerRouter from "./media.route";
import * as domainMiddleware from "../middlewares/domain.middleware";

const router = Router();

router.use('/file-manager', fileManagerRouter);
router.use('/media', domainMiddleware.domainMiddleware, mediaManagerRouter);

export default router;