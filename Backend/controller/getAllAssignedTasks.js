const TaskAssignedModel = require("../model/assignTaskModel");

const getAllAssignedTasks = async (req, res) => {
  try {
    const Tasks = await TaskAssignedModel.find()
      .populate("taskId", "taskTitle")
      .populate("assignedTo", "name")
      .populate("assignedBy", "name");
    if (!Tasks || Tasks.length === 0) {
      res.status(404).json({ message: "No tasks Found" });
    }
    res.status(200).json({ Tasks });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server Error WHile Fetching Tasks ", error });
  }
};
module.exports = getAllAssignedTasks;
