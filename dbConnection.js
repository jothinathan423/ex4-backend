const mongoose = require("mongoose");
const config = require("./config");

const connectDB = async () => {
  try {
    // Ensure the DB_URI is defined
    if (!config.DB_URI) throw new Error("❌ MongoDB URI is missing in config");

    // Connect to MongoDB
    await mongoose.connect(config.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
