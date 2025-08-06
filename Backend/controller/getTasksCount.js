const tasksModel = require("../model/taskModel");
const assignedTaskModel = require("../model/assignTaskModel");

const getTasksCount = async (req, res) => {
  try {
    const totaltasks = await tasksModel.countDocuments();
    const assignedTask = await assignedTaskModel.countDocuments({});
    const completedTasks = await assignedTaskModel.countDocuments({
      status: "Completed",
    });

    res.status(200).json({ totaltasks, assignedTask, completedTasks });
  } catch (error) {
    res.status(500).json({ message: "Server Error " });
  }
};
module.exports = getTasksCount;
