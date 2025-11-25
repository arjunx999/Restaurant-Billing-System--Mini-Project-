import express from "express";
import { getAllOrders, billOrder } from "../controllers/orderController.js";

const router = express.Router();

router.get("/allOrders", verifyToken, getAllOrders);

router.post("/bill-order", verifyToken, billOrder);

export default router;
