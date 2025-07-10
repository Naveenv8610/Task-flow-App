import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

const Createtask = () => {
  const [taskTitle, settaskTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateTask = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const userId = userData.id;
    console.log("This is user data ", userData);
    // const userId = userData._id;
    try {
      const response = await fetch(
        "http://localhost:4000/api/create/createTask",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ taskTitle, description, createdBy: userId }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Task Created Sucessfully....");
        settaskTitle("");
        setDescription("");
      } else {
        alert(data.message || "Error While Creating Task");
      }
    } catch (error) {
      console.log("Error while creating task", error);
      alert("Error While Creating Task");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        boxShadow: 3,
        border: 2,
        gap: 5,
        p: 2,
        mt: 2,
        ml: "21rem",
        borderRadius: 2,
        height: "55vh",
      }}
    >
      <Typography
        sx={{ fontWeight: "bold", fontSize: "1.2rem", textAlign: "center" }}
      >
        Create Task
      </Typography>
      <TextField
        label="Task Title"
        value={taskTitle}
        onChange={(e) => settaskTitle(e.target.value)}
        variant="outlined"
      />
      <TextField
        label="Decription"
        multiline
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button variant="contained" onClick={handleCreateTask}>
          {" "}
          Create{" "}
        </Button>
      </Box>
    </Box>
  );
};

export default Createtask;
