const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const profile=require("./routes/profileroute")
const getAllPosts = require("./routes/getposts");
const searchUsers=require("./routes/searchUsers")
const likedposts=require("./routes/likedposts")
const followingContent=require("./routes/followingContent")
const userRoutes = require('./routes/userRoute');
const followcontroller=require("./routes/follow")
const getComments=require("./routes/getComments")
const addCommentRoute = require("./routes/addcommentRoute");
const app = express();


// Load environment variables from .env file
dotenv.config();

app.use(express.json());
app.use(cors());

//routes

app.use('/revonn/user', userRoutes);
app.use("/revonn/posts", getAllPosts);
app.use("/revonn/followingcontent",followingContent);
app.use("/revonn/users",searchUsers)
app.use("/revonn/posts",likedposts)
app.use("/revonn/users",profile)
app.use("/revonn/follow",followcontroller)
app.use("/revonn/allcomments",getComments)
app.use("/revonn/addcomment",addCommentRoute)



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
