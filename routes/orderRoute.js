import express from "express";
import { checkAuthorization } from "../middlewares/checkAuthId.js";

import {
  createOrder,
  deleteOrder,
  getMyOrder,
  updateorder,
} from "../controllers/orderController.js";

const router = express.Router();

//skapaOrder router
router.post("/",checkAuthorization, createOrder);
// router.get("/", getOrderHistory)

//deleteOrder router
router.delete("/",checkAuthorization, deleteOrder);

//getMyOrder router
router.get("/",checkAuthorization, getMyOrder);

//changeOrder router
router.put("/",checkAuthorization, updateorder);

export default router;
