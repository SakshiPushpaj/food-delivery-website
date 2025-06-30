import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import authRouter from "./routes/authRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//app config
const app = express();
const port = process.env.PORT || 4000;

//middleware
app.use(cors({
    origin: 'http://localhost:5173', // Vite's default port
    credentials: true
}));
app.use(express.json());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//db connection
connectDB();

//api endpoints
app.use("/api/auth", authRouter);
// Public food route
app.use("/api/food", foodRouter);
// Protected routes
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);

app.get("/", (req, res) => {
    res.send("API Working");
});

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`);
});