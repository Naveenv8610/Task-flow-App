import { Box, Button, Grid, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

const Topbar = () => {
  const Navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData"));
  console.log("user Info", userData);
  const handleLogout = () => {
    const confirm = window.confirm("Are u sure you want to logout");
    if (confirm) {
      localStorage.removeItem("userData");
      Navigate("/");
    }
  };
  const fetchCount = async () => {
    const userId = userData.id;
    try {
      const userResponse = await fetch(
        "http://localhost:4000/api/get/getUsersCount"
      );
      const taskResponse = await fetch(
        "http://localhost:4000/api/get/getTasksCount"
      );
      const userTaskResponse = await fetch(
        `http://localhost:4000/api/get/getUserTask/${userId}`
      );
      const userdata = await userResponse.json();
      const taskData = await taskResponse.json();
      const userTaskData = await userTaskResponse.json();

      setUserCount(userdata);
      setTaskCount(taskData);
      setUserTask(userTaskData);
      console.log("This task count Info", userTaskData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCount();
  }, []);

  const [userCount, setUserCount] = useState({});
  const [taskCount, setTaskCount] = useState({});
  const [userTask, setUserTask] = useState({});

  return (
    <Box
      sx={{
        backgroundColor: "",
        height: "30vh",
        boxShadow: 4,
        ml: "21rem",
        borderRadius: 3,
        border: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "0 20px",
            gap: 1,
          }}
        >
          <Typography fontWeight={"bold"}> {userData.name} </Typography>
          <Button endIcon={<LogoutIcon />} onClick={handleLogout}>
            {" "}
            Logout
          </Button>
        </Box>
      </Box>

      <Box
        sx={{ display: "flex", justifyContent: "space-between", padding: 3 }}
      >
        <Typography>
          {" "}
          <strong>Welcome! </strong>
          {userData.name}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "row", gap: 46, padding: 3 }}>
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#f0f0f0",
            boxShadow: 3,
            borderRadius: 2,
            justifyContent: "center",
            alignItems: "center",
            padding: 3,
            height: 100,
            width: 150,
          }}
        >
          {userData.role === "employee" && (
            <>
              <Typography> Pending Task </Typography>
              <Typography>
                <strong> {userTask.pendingTask}</strong>
              </Typography>
            </>
          )}

          {userData.role === "manager" && (
            <>
              <Typography>Total Tasks </Typography>
              <Typography>
                <strong> {taskCount.totaltasks}</strong>
              </Typography>
            </>
          )}
          {userData.role === "admin" && (
            <>
              <Typography>Total Users </Typography>
              <Typography>
                <strong> {userCount.totalUsers}</strong>
              </Typography>
            </>
          )}
        </Grid>
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#90caf9",
            boxShadow: 3,
            borderRadius: 2,
            justifyContent: "center",
            alignItems: "center",
            padding: 3,
            height: 100,
            width: 150,
          }}
        >
          {userData.role === "employee" && (
            <>
              <Typography>In Progress</Typography>
              <Typography>
                {" "}
                <strong> {userTask.inprogressTask}</strong>
              </Typography>
            </>
          )}
          {userData.role === "manager" && (
            <>
              <Typography>Assigned </Typography>
              <Typography>
                <strong>{taskCount.assignedTask} </strong>
              </Typography>
            </>
          )}
          {userData.role === "admin" && (
            <>
              <Typography> Managers </Typography>
              <Typography>
                <strong> {userCount.managers}</strong>
              </Typography>
            </>
          )}
        </Grid>
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#a5d6a7",
            boxShadow: 3,
            borderRadius: 2,
            justifyContent: "center",
            alignItems: "center",
            padding: 3,
            height: 100,
            width: 150,
          }}
        >
          {userData.role === "employee" && (
            <>
              <Typography>Done </Typography>
              <Typography>
                {" "}
                <strong> {userTask.completedTask}</strong>
              </Typography>
            </>
          )}
          {userData.role === "manager" && (
            <>
              <Typography>Done </Typography>
              <Typography>
                <strong>{taskCount.completedTasks}</strong>
              </Typography>
            </>
          )}
          {userData.role === "admin" && (
            <>
              <Typography> Employees </Typography>
              <Typography>
                <strong> {userCount.employees}</strong>
              </Typography>
            </>
          )}
        </Grid>
      </Box>
    </Box>
  );
};
export default Topbar;
