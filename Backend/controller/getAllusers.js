const User = require("../model/user");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: { $in: ["manager", "employee"] } });
    if (users.length === 0) {
      res.status(404).json({ message: "No Users Found " });
    }
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Server Error ", error });
  }
};

module.exports = getAllUsers;
