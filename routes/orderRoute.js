import express from "express";

import {
  createOrder,
  deleteOrder,
  getMyOrder,
  updateorder,
} from "../controllers/orderController.js";

const router = express.Router();

//skapaOrder router
router.post("/", createOrder);
// router.get("/", getOrderHistory)

//deleteOrder router
router.delete("/", deleteOrder);

//getMyOrder router
router.get("/", getMyOrder);

//changeOrder router
router.put("/", updateorder);

export default router;
