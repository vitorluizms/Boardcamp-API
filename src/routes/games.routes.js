import { Router } from "express";
import { getGames, postGame } from "../controllers/game.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { gameSchema } from "../schemas/main.schemas.js";

const gameRouter = Router();

gameRouter.get("/games", getGames);
gameRouter.post("/games", validateSchema(gameSchema), postGame);

export default gameRouter;
