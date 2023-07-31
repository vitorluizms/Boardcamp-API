import { Router } from "express";
import {
  createCustomer,
  getCustomerById,
  getCustomers,
  updateCustomer,
} from "../controllers/client.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { clientSchema } from "../schemas/main.schemas.js";
import { validateCPF, validateUpdate } from "../middlewares/validateAuth.js";

const customersRouter = Router();

customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id", getCustomerById);
customersRouter.post("/customers", validateSchema(clientSchema), validateCPF, createCustomer);
customersRouter.put("/customers/:id", validateSchema(clientSchema), validateUpdate, updateCustomer)

export default customersRouter;
