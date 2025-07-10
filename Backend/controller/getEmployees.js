const userModel = require("../model/user");

const getEmployees = async (req, res) => {
  try {
    const employees = await userModel.find({ role: "employee" });

    if (!employees || employees.length === 0) {
      res.status(404).json({ message: "No Employees Found" });
    }
    res.status(200).json({ employees });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
module.exports = getEmployees;
