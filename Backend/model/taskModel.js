const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
  taskTitle: { type: String, required: true },
  description: { type: String, required: true },
  isAssigned: { type: Boolean, default: false },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Task", TaskSchema);
