const user = require("../model/user");

const AppoveUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const updateUser = await user.findByIdAndUpdate(
      userId,
      { isApproved: true },
      { new: true }
    );
    res.status(200).json({ message: "User Updated Sucesscully", updateUser });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = AppoveUser;
