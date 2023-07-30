import { Router } from "express";
import gameRouter from "./games.routes.js";
import customersRouter from "./clients.routes.js";

const router = Router();

router.use(gameRouter);
router.use(customersRouter);

export default router;
