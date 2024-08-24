require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// const multer = require('multer');
// const path = require('path');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
// const ApiResponse = require("../utils/ApiResponse.js").ApiResponse;

// Load environment variables

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
// app.use(bodyParser.json());
// app.use(cors());
app.use(express.json({ limit: "16kb" })); //For handling form data (configuration)
app.use(express.urlencoded({ extended: true, limit: "16kb" })); //For handling URL data (configuration)
app.use(express.static("public")); //For public assets (configuration)
app.use(cookieParser());

// Middleware for file uploads (if needed)
// app.use('/api/uploads', upload.single('profilePicture')); // Adjust field name as necessary

// Routes
app.use('/api', taskRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
