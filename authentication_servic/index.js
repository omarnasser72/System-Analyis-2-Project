const express = require('express');
const connectDB = require('./db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 7001;

// Connect to MongoDB
connectDB();

app.use(cors({ origin: "*" }))

// Parse JSON request body
app.use(express.json());

// Define authentication routes
app.use('/api/auth', authRoutes);

// Define user routes
app.use('/api/user', userRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
