const { json } = require("express");
const user = require("../model/user");

const DeleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const DeletedUser = await user.findByIdAndDelete(userId);
    res.status(200).json({ message: "UserDeletedSucessfully", DeletedUser });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
module.exports = DeleteUser;
