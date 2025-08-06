const AssignTaskModel = require("../model/assignTaskModel");

const deleteTask = async (req, res) => {
  const taskId = req.params.id;
  try {
    const deletedTask = await AssignTaskModel.findByIdAndDelete(taskId);
    res.status(200).json({ message: "Task Deleted Sucessfully", deletedTask });
  } catch (error) {
    res.status(500).json({ message: "Server error ", error });
  }
};

module.exports = deleteTask;
