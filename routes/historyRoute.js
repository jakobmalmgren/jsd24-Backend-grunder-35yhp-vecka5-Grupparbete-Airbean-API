import express from "express";
import { getOrderHistory } from "../controllers/historyController.js";
import { checkAuthId } from "../middlewares/checkAuthId.js";
const router = express.Router();

router.get("/", checkAuthId, getOrderHistory);

export default router;
