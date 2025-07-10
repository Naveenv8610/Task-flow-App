const TaskModel = require("../model/taskModel");

const createTask = async (req, res) => {
  const { taskTitle, description, createdBy } = req.body;

  try {
    if (!taskTitle || !description || !createdBy) {
      res.status(400).json({ message: "All fields are required" });
    }
    const newTask = new TaskModel(req.body);
    await newTask.save();
    res.status(200).json({ message: "Task Created Sucessfully", newTask });
  } catch (error) {
    res.status(500).json({ message: "Server Error while creating", error });
  }
};
module.exports = createTask;
