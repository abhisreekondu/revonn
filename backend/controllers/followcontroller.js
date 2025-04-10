const Users = require("../models/Users");

const toggleFollow = async (req, res) => {
  const { currentUserId, targetUserId } = req.body;

  if (currentUserId === targetUserId) {
    return res.status(400).json({ message: "You can't follow yourself" });
  }

  try {
    const currentUser = await Users.findById(currentUserId);
    const targetUser = await Users.findById(targetUserId);
    console.log("received currentUserid in followcontroller:",currentUser)
    console.log("received targetUserid in followcontroller",targetUser)

    if (!currentUser || !targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const alreadyFollowing = currentUser.following.includes(targetUserId);

    if (alreadyFollowing) {
      // Unfollow
      currentUser.following.pull(targetUserId);
     
    } else {
      // Follow
      currentUser.following.push(targetUserId);
    }

    await currentUser.save();
    await targetUser.save();

    res.status(200).json({ following: !alreadyFollowing });
  } catch (err) {
    console.error("Follow toggle error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { toggleFollow };
