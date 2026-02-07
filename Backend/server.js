import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./mongoDB/connectDB.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import connectionRoutes from "./routes/connectionRoutes.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

/* ---------------- MIDDLEWARE ---------------- */
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());

/* ---------------- API ROUTES ---------------- */
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/connections", connectionRoutes);

// Serve frontend (React built with Vite)
app.use(express.static(path.join(__dirname, "../Frontend/dist")));
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/dist/index.html"));
});

/* ---------------- SERVER ---------------- */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
