import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

const Update = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const userId = userData.id;
      try {
        const response = await fetch(
          `http://localhost:4000/api/getTask/getAssignedTaskofUser/${userId}`,
          {
            method: "GET",
          }
        );
        const data = await response.json();
        console.log("This is Tasks Info", data?.AssignedTasks);
        const safeTasks = data?.AssignedTasks || [];
        setTasks(safeTasks);
      } catch (error) {
        console.log("Error in fetching");
      }
    };
    fetchTasks();
  }, []);

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/edit/updateTask/${taskTitle}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        alert("Task Upadted Sucesfully...");
        setTaskTitle("");
        setStatus("");
      } else {
        alert(data.message || "Error while Updating");
      }
    } catch (error) {
      console.log("Error While updating , Please try again");
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        boxShadow: 3,
        gap: 5,
        p: 3,
        mt: 2,
        border: 2,
        ml: "21rem",
        borderRadius: 2,
        height: "55vh",
      }}
    >
      <Typography
        sx={{ textAlign: "center", fontWeight: "bold", fontSize: "1.2rem" }}
      >
        Update Task
      </Typography>

      <FormControl>
        <InputLabel> Task Title </InputLabel>
        <Select
          value={taskTitle}
          label="Task Title"
          onChange={(e) => setTaskTitle(e.target.value)}
        >
          {tasks.map((task) => (
            <MenuItem key={task._id} value={task._id}>
              {" "}
              {task.taskId.taskTitle}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel> Status</InputLabel>
        <Select
          value={status}
          label="Status"
          onChange={(e) => setStatus(e.target.value)}
        >
          <MenuItem value="Pending"> Pending </MenuItem>
          <MenuItem value="In Progress"> In Progress</MenuItem>
          <MenuItem value="Completed"> Completed</MenuItem>
        </Select>
      </FormControl>

      {/* <TextField
        label="Description"
        multiline
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      /> */}
      <Button variant="contained" onClick={handleUpdate}>
        Update
      </Button>
    </Box>
  );
};
export default Update;
