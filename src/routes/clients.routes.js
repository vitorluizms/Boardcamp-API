import { Router } from "express";
import { getCustomers } from "../controllers/client.controller.js";

const customersRouter = Router();

customersRouter.get("/customers", getCustomers)

export default customersRouter