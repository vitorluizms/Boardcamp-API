import { Router } from "express";
import gameRouter from "./games.routes.js";
import customersRouter from "./clients.routes.js";
import rentalsRouter from "./rentals.routes.js";

const router = Router();

router.use(gameRouter);
router.use(customersRouter);
router.use(rentalsRouter);

export default router;
