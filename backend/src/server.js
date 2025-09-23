import express from "express";
import "dotenv/config";
import job from "./lib/cron.js";
import cors from "cors";

import bookRoutes from "./routes/bookRoutes.js";
import authRoutes from "./routes/authRoutes.js";

import ConnectDatabase from "./lib/Database.js";

const app = express();
const PORT = process.env.PORT;

job.start();
app.use(cors());
app.use(express.json());

app.use("/api/books", bookRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  ConnectDatabase();
});
