import express from "express";
import { getOrderHistory } from "../controllers/historyController.js";
import { checkAuthorization } from "../middlewares/checkAuthId.js";

const router = express.Router();

router.get("/", checkAuthorization, getOrderHistory);

export default router;
