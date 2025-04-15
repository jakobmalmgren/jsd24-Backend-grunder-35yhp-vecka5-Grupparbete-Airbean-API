import express from "express";
import { createOrder } from "../controllers/orderController.js";

const router = express.Router();

//skapaOrder router
router.post("/", createOrder);

export default router;
