import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import dayjs from "dayjs";
import React, { useState } from "react";

import { useEffect } from "react";

const Assigntask = () => {
  const [selectEmployee, setSelectEmployee] = useState("");
  const [tasktitle, setTaskTitle] = useState("");
  const [deadline, setDeadline] = useState(dayjs());

  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetctEmployees = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/getEmployees/getAllEmployees",
          {
            method: "GET",
            headers: {
              "content-type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setEmployees(data.employees);
        } else {
          alert(data.message || "Error while feching employees");
        }
      } catch (error) {
        console.log("Error While Fetching Employees", error);
      }
    };
    fetctEmployees();
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const Tasks = await fetch(
          "http://localhost:4000/api/getTasks/getAllTasks",
          {
            method: "GET",
            headers: {
              "content-type": "application/json",
            },
          }
        );
        const data = await Tasks.json();
        //  console.log("This is tasks ",   data.Tasks)
        if (Tasks.ok) {
          setTasks(data.Tasks);
        } else {
          alert(data.message || "Error while fecthing tasks ");
        }
      } catch (error) {
        console.log("Error while feteching Tasks", error);
      }
    };
    fetchTasks();
  }, []);

  const handleAssignTask = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));

    console.log("This Is Admin info", userData);
    const userId = userData.id;
    const selectedTask = tasks.find((task) => task._id === tasktitle);
    const body = {
      taskId: tasktitle,
      description: selectedTask?.description,
      assignedTo: selectEmployee,
      assignedBy: userId,
      deadline: deadline.format("YYYY-MM-DD"),
    };
    try {
      const response = await fetch(
        "http://localhost:4000/api/assign/assignTask",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Task Assigned Sucessfully");
        setSelectEmployee("");
        setTaskTitle("");
        setDeadline(dayjs());
        return;
      } else {
        alert(data.message || "Error While Assigning Task...");
      }
    } catch (error) {
      alert("Error While Assigning Task", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        boxShadow: 2,
        borderRadius: 2,
        ml: "21rem",
        mt: 2,
        border: 2,
        height: "55vh",
        padding: 2,
        gap: 5,
      }}
    >
      <Typography
        sx={{ fontWeight: "bold", fontSize: "1.2rem", textAlign: "center" }}
      >
        {" "}
        Assign Task
      </Typography>

      <FormControl>
        <InputLabel> Select Employee</InputLabel>
        <Select
          label="Select Employee"
          value={selectEmployee}
          onChange={(e) => setSelectEmployee(e.target.value)}
        >
          {employees.map((employee) => (
            <MenuItem key={employee._id} value={employee._id}>
              {" "}
              {employee.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel>Task Title</InputLabel>
        <Select
          label="Task Title"
          value={tasktitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        >
          {tasks.map((task) => (
            <MenuItem key={task._id} value={task._id}>
              {" "}
              {task.taskTitle}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <DesktopDatePicker
        label="Deadline"
        value={deadline}
        onChange={(newvalue) => setDeadline(newvalue)}
        renderInput={(params) => <TextField fullWidth {...params} />}
      />

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button variant="contained" color="success" onClick={handleAssignTask}>
          {" "}
          Assign
        </Button>
      </Box>
    </Box>
  );
};

export default Assigntask;
