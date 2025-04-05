const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema(
    {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: "" },
    location: { type: String, required: true }, 
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], 
  }, { timestamps: true }
)

module.exports = mongoose.model("Users", UserSchema);
