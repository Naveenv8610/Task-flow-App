const mongoose = require("mongoose");

const userScheme = mongoose.Schema({
  name: { type: String, required: true },
  contactnumber: { type: Number, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["manager", "employee", "admin"],
    default: "employee",
  },
  isApproved: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", userScheme);
