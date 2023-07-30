import { Router } from "express";
import {
  createCustomer,
  getCustomerById,
  getCustomers,
  updateCustomer,
} from "../controllers/client.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { clientSchema } from "../schemas/main.schemas.js";
import validateCPF from "../middlewares/validateAuth.js";

const customersRouter = Router();

customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id", getCustomerById);
customersRouter.post("/customers", validateSchema(clientSchema), validateCPF, createCustomer);
customersRouter.put("/customers/:id", validateSchema(clientSchema), validateCPF, updateCustomer)

export default customersRouter;
