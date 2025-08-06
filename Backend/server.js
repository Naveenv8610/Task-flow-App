const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const MONGO_URL = "mongodb://localhost:27017/signup-Data";
const PORT = 4000;
const routes = require("./Routes/Routes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/register", routes);
app.use("/api/login", routes);
app.use("/api/get", routes);
app.use("/api/update", routes);
app.use("/api/delete", routes);
app.use("/api/getAll", routes);
app.use("/api/edit", routes);
app.use("/api/create", routes);
app.use("/api/getEmployees", routes);
app.use("/api/getTasks", routes);
app.use("/api/assign", routes);
app.use("/api/get", routes);
app.use("/api/getTask", routes);
app.use("/api/edit", routes);
app.use("/api/get", routes);
app.use("/api/get", routes);
app.use("/api/get", routes);
app.use("/api/edit", routes);
app.use("/api/delete", routes);
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB....");

    app.listen(PORT, () => {
      console.log(`Server is Running on port ${PORT}`);
    });
  })
  .catch(() => {
    console.log("Error in connecting to mongoDB");
  });
