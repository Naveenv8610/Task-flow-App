const Usermodel = require("../model/user");

const getUsersCount = async (req, res) => {
  try {
    const totalUsers = await Usermodel.countDocuments();
    const employees = await Usermodel.countDocuments({ role: "employee" });
    const managers = await Usermodel.countDocuments({ role: "manager" });

    res.status(200).json({ totalUsers, employees, managers });
  } catch (error) {
    res.status(500).json({ message: " Eroor in fetching users ", error });
  }
};

module.exports = getUsersCount;
