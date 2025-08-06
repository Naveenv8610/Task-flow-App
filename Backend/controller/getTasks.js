const { model } = require("mongoose");
const taskModel = require("../model/taskModel");

const getTasks = async (req, res) => {
  try {
    const Tasks = await taskModel.find({ isAssigned: false });

    if (!Tasks || Tasks.length === 0) {
      return res.status(404).json({ message: "No Tasks Found" });
    }

    res.status(200).json({ Tasks });
  } catch (error) {
    res.status(500).json({ message: "Server Error ", error });
  }
};

module.exports = getTasks;
