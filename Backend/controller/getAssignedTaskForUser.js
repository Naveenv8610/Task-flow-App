const { default: mongoose } = require("mongoose");
const AssignTaskModel = require("../model/assignTaskModel");

const AssignedTask = async (req, res) => {
  try {
    const  userId  = req.params.id;
    const AssignedTasks = await AssignTaskModel.find({
      assignedTo: new mongoose.Types.ObjectId(String(userId)),
    })
      .populate("taskId", "taskTitle")
      .populate("assignedBy", "name");

    if (!AssignedTasks || AssignedTasks.length === 0) {
      return res.status(404).json({ message: "No Tasks " });
    }
    res.status(200).json({ AssignedTasks });
  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong" });
  }
};

module.exports = AssignedTask;
