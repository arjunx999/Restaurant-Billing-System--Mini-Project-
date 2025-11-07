import express from "express";
import { addDish, deleteDish } from "../controllers/dishController.js";

const router = express.Router();

router.post("/add", verifyToken, addDish);

router.delete("/delete/:id", verifyToken, deleteDish);

export default router;
