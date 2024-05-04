const express = require("express");
const connectDB = require("./db");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 7001;

// Connect to MongoDB
connectDB();

app.use(cors({ origin: "*" }));

// Parse JSON request body
app.use(express.json());

// Define authentication routes
app.use("/api/auth", authRoutes);

// Define user routes
app.use("/api/user", userRoutes);

//health check
app.get("/healthCheck", (req, res, next) => {
  try {
    res.status(200).json("health check api from job service");
  } catch (error) {
    next(error);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
