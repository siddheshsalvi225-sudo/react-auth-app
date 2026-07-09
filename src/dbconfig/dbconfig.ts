import mongoose from "mongoose";

export async function connect() {
  console.log("🔥 connect() function called");

  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined");
    }

    console.log("Trying to connect...");

    await mongoose.connect(mongoUri);

    console.log("✅ await mongoose.connect() finished");

    mongoose.connection.on("connected", () => {
      console.log("✅ MongoDB connected successfully");
    });

    mongoose.connection.on("error", (err) => {
      console.log("❌ MongoDB connection error:", err);
    });

  } catch (error) {
    console.error("Connection Error:", error);
  }
}