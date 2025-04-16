import express from "express";
import { getOrderHistory } from "../controllers/historyController.js";

const router = express.Router();

router.get("/", getOrderHistory);

export default router;
