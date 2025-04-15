import express from "express"
import { getMenu, getProductById } from "../controllers/menuController.js"

const router = express.Router()

router.get("/", getMenu)
router.get("/:id", getProductById)

export default router