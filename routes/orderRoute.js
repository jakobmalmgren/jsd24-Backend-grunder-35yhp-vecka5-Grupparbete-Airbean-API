import express from "express";
import { checkAuthId } from "../middlewares/checkAuthId.js";

import {
  createOrder,
  deleteOrder,
  getMyOrder,
  updateorder,
} from "../controllers/orderController.js";

const router = express.Router();

//skapaOrder router
router.post("/", checkAuthId, createOrder);
// router.get("/", getOrderHistory)

//deleteOrder router
router.delete("/", checkAuthId, deleteOrder);

//getMyOrder router
router.get("/", checkAuthId, getMyOrder);

//changeOrder router
router.put("/", checkAuthId, updateorder);

export default router;
