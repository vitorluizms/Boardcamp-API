import { Router } from "express";
import {
  getCustomerById,
  getCustomers,
} from "../controllers/client.controller.js";

const customersRouter = Router();

customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id", getCustomerById);

export default customersRouter;
