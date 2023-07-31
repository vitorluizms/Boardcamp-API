import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { rentalSchema } from "../schemas/main.schemas.js";
import { createRental, finishRental, getRentals } from "../controllers/rentals.controller.js";

const rentalsRouter = Router();

rentalsRouter.post("/rentals", validateSchema(rentalSchema), createRental);
rentalsRouter.get("/rentals", getRentals);
rentalsRouter.post("/rentals/:id/return", finishRental)

export default rentalsRouter;
