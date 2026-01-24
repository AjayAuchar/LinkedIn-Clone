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
dotenv.config();
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json({ limit: "5mb" })); // parse JSON request bodies (handle large img)
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/connections", connectionRoutes);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
  connectDB();
});

// Serve frontend (React built with Vite)
app.use(express.static(path.join(__dirname, "../Frontend/dist")));
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/dist/index.html"));
});
