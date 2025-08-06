const assignedTaskModel = require("../model/assignTaskModel");

const getUserTaskCount = async (req, res) => {
  const employeeId = req.params.id;
  try {
    const inprogressTask = await assignedTaskModel.countDocuments({
      assignedTo: employeeId,
      status: "In Progress",
    });
    const pendingTask = await assignedTaskModel.countDocuments({
      assignedTo: employeeId,
      status: "Pending",
    });
    const completedTask = await assignedTaskModel.countDocuments({
      assignedTo: employeeId,
      status: "Completed",
    });
    res.status(200).json({ inprogressTask, pendingTask, completedTask });
  } catch (error) {
    res.status(500).json({ message: "Server error ", error });
  }
};

module.exports = getUserTaskCount;
