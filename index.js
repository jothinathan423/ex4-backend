// Import necessary modules
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const config = require("./config");
const dbConnection = require("./dbConnection");

// Load environment variables
dotenv.config();

// Initialize app
const app = express();
const PORT = config.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Establish Database Connection
dbConnection()
  .then(() => console.log("✅ Database connected successfully"))
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
    process.exit(1); // Exit if DB fails
  });

// Import and set up routes
app.use("/user", require("./router/user.routes"));
app.use("/owner", require("./router/owner.routes"));
app.use("/order", require("./router/order.routes"));

// Serve static files from the 'build' directory (React frontend)
app.use(express.static(path.join(__dirname, "build")));

// Handle all other routes by serving the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
