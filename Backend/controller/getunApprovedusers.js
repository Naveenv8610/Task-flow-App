const User = require("../model/user");

const getUpApprovedUsers = async (req, res) => {
  try {
    const users = await User.find({ isApproved: false });
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = getUpApprovedUsers;
