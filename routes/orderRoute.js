//order route

import express from "express";
import { checkAuthorization } from "../middlewares/checkAuthId.js";

import {
  createOrder,
  deleteOrder,
  getMyOrder,
  updateorder,
} from "../controllers/orderController.js";
import { validateBody } from "../middlewares/validateBody.js";
import {
  createOrderSchema,
  deleteOrderSchema,
  updateOrderSchema,
} from "../validators/orderValidator.js";
import { validateProductAgainstMenu } from "../middlewares/validateProductAgainstMenu.js";

const router = express.Router();

//generell beskrivning av filen:
// kollar så man är inloggad och authentifiserad
//validerar om inkommande req.body har rätt format och rätt typ av input

//skapaOrder router
router.post(
  "/",
  checkAuthorization,
  validateBody(createOrderSchema),
  validateProductAgainstMenu,
  createOrder
);

//deleteOrder router
router.delete(
  "/",
  checkAuthorization,
  validateBody(deleteOrderSchema),
  deleteOrder
);

//getMyOrder router, hämtar min varukorg
router.get("/", checkAuthorization, getMyOrder);

//changeOrder router
router.put(
  "/",
  checkAuthorization,
  validateBody(updateOrderSchema),
  updateorder
);

export default router;
