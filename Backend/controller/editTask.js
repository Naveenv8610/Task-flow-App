const AssignTaskModel = require("../model/assignTaskModel");

const updateTask = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedData = await AssignTaskModel.findByIdAndUpdate(
      id,
      {
        ...req.body,
        isAssigned: true,
      },
      { new: true }
    );
    res.status(200).json({ message: "Updated Sucessfully", updatedData });
  } catch (error) {
    res.status(500).json({ message: "Serveer Error", error });
  }
};
module.exports = updateTask;
