const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const getAllPosts = require("./routes/getposts");
const searchUsers=require("./routes/searchUsers")
const likedposts=require("./routes/likedposts")
const followingContent=require("./routes/followingContent")
const app = express();


// Load environment variables from .env file
dotenv.config();

app.use(express.json());
app.use(cors());


const userRoutes = require('./routes/userRoute');
app.use('/revonn/user', userRoutes);
app.use("/revonn/allposts", getAllPosts);
app.use("/revonn/followingcontent",followingContent);
app.use("/revonn/users",searchUsers)
app.use("/revonn/posts",likedposts)

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { dbName: 'communityDB' })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Exit process if connection fails
  });

// MongoDB connection event
mongoose.connection.on('connected', () => {
  console.log("✅ Connected to MongoDB database:", mongoose.connection.name);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
