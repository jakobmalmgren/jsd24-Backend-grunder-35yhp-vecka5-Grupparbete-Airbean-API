import express from "express";
import { createOrder, getOrderHistory } from "../controllers/orderController.js";

const router = express.Router();

//skapaOrder router
router.post("/", createOrder);
router.get("/", getOrderHistory)

export default router;
