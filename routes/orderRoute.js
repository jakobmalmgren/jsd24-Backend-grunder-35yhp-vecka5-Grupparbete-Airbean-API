import express from "express";
import { checkAuthorization } from "../middlewares/checkAuthId.js";

import {
  createOrder,
  deleteOrder,
  getMyOrder,
  updateorder,
} from "../controllers/orderController.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createOrderSchema } from "../validators/orderValidator.js";

const router = express.Router();

//skapaOrder router
router.post("/",checkAuthorization, validateBody(createOrderSchema), createOrder);
// router.get("/", getOrderHistory)

//deleteOrder router
router.delete("/",checkAuthorization, deleteOrder);

//getMyOrder router
router.get("/",checkAuthorization, getMyOrder);

//changeOrder router
router.put("/",checkAuthorization, updateorder);

export default router;
