import { Router } from "express";
import {
  createCustomer,
  getCustomerById,
  getCustomers,
} from "../controllers/client.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { clientSchema } from "../schemas/main.schemas.js";

const customersRouter = Router();

customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id", getCustomerById);
customersRouter.post(
  "/customers",
  validateSchema(clientSchema),
  createCustomer
);

export default customersRouter;
