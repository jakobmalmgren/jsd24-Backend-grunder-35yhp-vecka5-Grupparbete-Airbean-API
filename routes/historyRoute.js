//history route
import express from "express";
import { getOrderHistory } from "../controllers/historyController.js";
import { checkAuthorization } from "../middlewares/checkAuthId.js";

const router = express.Router();

//hämtar getOrderHistory från histoycontrollern &
//kollar så man är inloggad och authenfiserad

router.get("/", checkAuthorization, getOrderHistory);

export default router;
