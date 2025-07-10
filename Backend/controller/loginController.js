const { model } = require("mongoose");
const userModel = require("../model/user");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Credentials " });
    }

    if (!user.isApproved) {
      return res
        .status(403)
        .json({ message: "Accound Pending Approval by admin" });
    }
    res.status(200).json({
      message: "Login Sucessfull",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        contactnumber: user.contactnumber,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error ", error });
  }
};

module.exports = login;
