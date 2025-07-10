const assignTaskModel = require("../model/assignTaskModel");

const assignTask = async (req, res) => {
  const { taskId, assignedTo, assignedBy, deadline, description } = req.body;

  try {
    const newTask = new assignTaskModel(req.body);
    if (!taskId || !assignedTo || !assignedBy || !deadline || !description) {
      return res.status(400).json({ message: "All Fields are required" });
    }
    await newTask.save();
    return res.status(200).json({ message: "Task Assigned Sucessfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error ", error });
  }
};
module.exports = assignTask;
