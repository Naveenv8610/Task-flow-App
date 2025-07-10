const mongoose = require("mongoose");

const AssignTaskSchema = mongoose.Schema({
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Task",
  },
  description: { type: String, required: true },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  assignedBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  deadline: { type: Date, required: true },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending",
  },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("AssignedTask", AssignTaskSchema);
