const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const getFollPosts = require("./routes/getFollPosts");
const getAllPosts = require("./routes/getposts");
const getFollReels=require("./routes/getFollReels")
const app = express();
const  getusersbyuname =require("./routes/getusersbyuname")

// Load environment variables from .env file
dotenv.config();

app.use(express.json());
app.use(cors());


const userRoutes = require('./routes/userRoute');
app.use('/revonn/users', userRoutes);


// Set up routes
app.use("/revonn/followingposts", getFollPosts);
app.use("/revonn/allposts", getAllPosts);
app.use("/revonn/followingreels",getFollReels);
app.use('/revonn/user', getusersbyuname);

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
