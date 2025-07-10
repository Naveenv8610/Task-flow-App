const userModel = require("../model/user");
const bcrypt = require("bcryptjs");

const Signup = async (req, res) => {
  const { name, contactnumber, email, password, role } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      name,
      contactnumber,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    res.status(200).json({ message: "User Registered Sucessfully", newUser });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};

module.exports = Signup;
