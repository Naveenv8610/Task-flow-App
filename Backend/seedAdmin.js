const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./model/user");

mongoose.connect("mongodb://localhost:27017/signup-Data");

const seedAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({
      email: "naveenvenkateshh@gmail.com",
    });

    if (existingAdmin) {
      console.log("Admin Already exists");
      mongoose.disconnect();
      return;
    }

    const hashedPassword = await bcrypt.hash("Naveen@123", 10);

    const adminUser = new User({
      name: "Naveen Venkatesh",
      contactnumber: 9741960039,
      email: "naveenvenkateshh@gmail.com",
      password: hashedPassword,
      role: "admin",
      isApproved: true,
    });

    await adminUser.save();
    console.log("Admin Creadted sucessfully");
    mongoose.disconnect();
  } catch (error) {
    console.log("Error in creating admin", error);
    mongoose.disconnect();
  }
};

seedAdmin();
