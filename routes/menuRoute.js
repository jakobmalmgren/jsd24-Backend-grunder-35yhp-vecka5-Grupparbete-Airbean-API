//menu route

import express from "express";
import { menuParamsSchema } from "../validators/menuValidator.js";
import { validateParams } from "../middlewares/validateParams.js";
import { getMenu, getProductById } from "../controllers/menuController.js";

const router = express.Router();

//hämtar getMenu från menucontrollern &
//hämtar enskild produkt genom getProductById &
//validerar så URL är rät input

router.get("/", getMenu);
router.get("/:id", validateParams(menuParamsSchema), getProductById);

export default router;
