import express from "express";
import "dotenv/config";
import job from "./lib/cron.js";
import cors from "cors";

import bookRoutes from "./routes/bookRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import ConnectDatabase from "./lib/Database.js";

const app = express();
const PORT = process.env.PORT;

// ✅ Start the cron job
job.start();

app.use(cors());
app.use(express.json());

// ✅ Add a health route so your cron GET request doesn’t 404
app.get("/", (req, res) => {
  res.status(200).json({
    status: "✅ Bookworm backend is alive!",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// ✅ Your actual API routes
app.use("/api/books", bookRoutes);
app.use("/api/auth", authRoutes);

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  ConnectDatabase();
});
