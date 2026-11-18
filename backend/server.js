require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const bookRoutes = require("./routes/bookRoutes");

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL ? process.env.CLIENT_URL.split(",") : true }));
app.use(express.json());

app.get("/", (_req, res) => res.json({ message: "Library Management API is running" }));
app.use("/api/books", bookRoutes);

app.use((req, res) => res.status(404).json({ message: `Route ${req.method} ${req.originalUrl} not found` }));
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Server error" });
});

const PORT = process.env.PORT || 5000;
connectDB().then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch(err => { console.error("Database connection failed:", err.message); process.exit(1); });
