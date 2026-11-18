
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const bookRoutes = require("./routes/bookRoutes");

const app = express();

// Allow frontend connections (temporary testing configuration)
app.use(cors({ origin: true }));

app.use(express.json());

// Test API
app.get("/", (req, res) => {
  res.json({
    message: "Library Management API is running"
  });
});

// Book routes
app.use("/api/books", bookRoutes);

// Invalid routes
app.use((req, res) => {
  res.status(404).json({
    message: `Route ${req.method} ${req.originalUrl} not found`
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: err.message || "Server error"
  });
});

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("MongoDB connected");
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  });
