//user route
import express from "express";
import { createUser, loginUser } from "../controllers/userController.js";
import {
  createUserSchema,
  loginUserSchema,
} from "../validators/userValidator.js";
import { validateBody } from "../middlewares/validateBody.js";

const router = express.Router();

<<<<<<< HEAD
//generell beskrivning av filen:
//validerar om inkommande req.body har rätt format
// samt skapar och loggar in genom usercontroller

router.post("/create", validateBody(createUserSchema), createUser);
router.post("/login", validateBody(loginUserSchema), loginUser);
=======
router.post("/create",validateBody(createUserSchema) , createUser);
router.post("/login",validateBody(loginUserSchema), loginUser);
>>>>>>> 9b1d523efd05c3fa4a2d986b76209804813b313f

export default router;
