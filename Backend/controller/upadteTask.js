const AssignTaskModel = require("../model/assignTaskModel");

const UpdateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    // const { status } = req.body;

    const updatedTask = await AssignTaskModel.findByIdAndUpdate(
      taskId,
      req.body,
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ messsage: "Task Not Found" });
    }
    res.status(200).json({ message: "Task Upadted Sucessfully", updatedTask });
  } catch (error) {
    res.status(500).json({ message: "Server error " });
  }
};
module.exports = UpdateTask;
