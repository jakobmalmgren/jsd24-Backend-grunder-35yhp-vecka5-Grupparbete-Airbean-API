import express from "express";
import { checkAuthId } from "../middlewares/checkAuthId.js";
import { createCartStatus } from "../controllers/statusController.js";

const router = express.Router();

router.post("/", checkAuthId, createCartStatus);

export default router;
