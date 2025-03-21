const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const postRoutes = require("./routes/postRoutes"); // Import post routes

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());
app.use("/api/posts", postRoutes); // Register routes

mongoose.connect(process.env.MONGO_URI, { dbName: 'communityDB' })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

  mongoose.connection.on('connected', () => {
    console.log("Connected to MongoDB database:", mongoose.connection.name);
  });
  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
