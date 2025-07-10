const { json } = require("express");
const user = require("../model/user");

const editUser = async (req, res) => {
  const userId = req.params.id;
  //   const { name, email, contactnumber, role, isApproved } = req.body;

  try {
    const updatedUser = await user.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    if (!updatedUser) {
      res.status(404).json({ message: "User Not Found" });
    }
    res.status(200).json({ message: "User Updated Sucessfully", updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = editUser;
