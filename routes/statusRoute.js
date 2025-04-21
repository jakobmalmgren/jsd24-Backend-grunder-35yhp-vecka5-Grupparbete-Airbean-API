//status route
import express from "express";
import { checkAuthorization } from "../middlewares/checkAuthId.js";
import { createCartStatus } from "../controllers/statusController.js";

const router = express.Router();

//hämtar createCartStatus från statuscontrollern &
//kollar så man är inloggad och authenfiserad

router.post("/", checkAuthorization, createCartStatus);

export default router;
