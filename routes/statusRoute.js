import express from "express";
import { checkAuthorization } from "../middlewares/checkAuthId.js";
import { createCartStatus } from "../controllers/statusController.js";

const router = express.Router();

router.post("/", checkAuthorization, createCartStatus);

export default router;
