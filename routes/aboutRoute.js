//about route

import express from "express";
import { getAboutInfo } from "../controllers/aboutController.js";

const router = express.Router();

//hämtar getAboutInfo från aboutcontrollern

router.get("/", getAboutInfo);

export default router;
