import mongoose from "mongoose";

const ConnectDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      dbName: "BookWorms",
    });
    console.log("✅ MongoDB Connected Successfully!");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

export default ConnectDatabase;
