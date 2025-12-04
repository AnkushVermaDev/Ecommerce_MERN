import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";



dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());



// User routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);


app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5500;
const IP = process.env.BACKEND_IP
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
