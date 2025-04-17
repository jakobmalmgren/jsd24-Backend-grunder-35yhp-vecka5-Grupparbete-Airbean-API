import express from "express";
import { createUser, loginUser } from "../controllers/userController.js";
import { createUserSchema, loginUserSchema } from "../validators/userValidator.js";
import { validateBody } from "../middlewares/validateBody.js";

const router = express.Router();

router.post("/",validateBody(createUserSchema) , createUser);
router.post("/login",validateBody(loginUserSchema), loginUser);

export default router;
