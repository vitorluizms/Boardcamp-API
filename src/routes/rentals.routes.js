import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { rentalSchema } from "../schemas/main.schemas.js";
import { createRental, deleteRental, finishRental, getRentals } from "../controllers/rentals.controller.js";
import { validateId } from "../middlewares/validateAuth.js";

const rentalsRouter = Router();

rentalsRouter.post("/rentals", validateSchema(rentalSchema), createRental);
rentalsRouter.get("/rentals", getRentals);
rentalsRouter.post("/rentals/:id/return", validateId ,finishRental)
rentalsRouter.delete("/rentals/:id", validateId, deleteRental)

export default rentalsRouter;
