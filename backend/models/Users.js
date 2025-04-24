const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema(
    {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: "" },
    location: { type: String, required: true }, 
    bio: { type: String, default: "" },
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
    savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Posts" }],

  }, { timestamps: true }
)

module.exports = mongoose.model("Users", UserSchema);
