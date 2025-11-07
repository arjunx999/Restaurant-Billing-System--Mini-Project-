import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import authRoutes from "./routes/authRoutes.js";
import dishRoutes from "./routes/dishRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// routes
app.use("/auth", authRoutes);

app.use("/dish", dishRoutes);

const PORT = process.env.PORT || 9999;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
