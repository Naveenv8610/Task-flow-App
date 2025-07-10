import { Box, Button, Grid, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const Navigate = useNavigate();

  const handleLogout = () => {
    const confirm = window.confirm("Are u sure you want to logout");
    if (confirm) {
      localStorage.removeItem("userData");
      Navigate("/");
    }
  };

  const userData = JSON.parse(localStorage.getItem("userData"));
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
              <Typography>Pending </Typography>
              <Typography>
                <strong> 5</strong>
              </Typography>
            </>
          )}

          {userData.role === "manager" && (
            <>
              <Typography>Total Tasks </Typography>
              <Typography>
                <strong> 50</strong>
              </Typography>
            </>
          )}
          {userData.role === "admin" && (
            <>
              <Typography>Total Users </Typography>
              <Typography>
                <strong> 50</strong>
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
                <strong> 30</strong>
              </Typography>
            </>
          )}
          {userData.role === "manager" && (
            <>
              <Typography>Assigned </Typography>
              <Typography>
                <strong>40 </strong>
              </Typography>
            </>
          )}
          {userData.role === "admin" && (
            <>
              <Typography> Managers </Typography>
              <Typography>
                <strong> 50</strong>
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
                <strong> 5</strong>
              </Typography>
            </>
          )}
          {userData.role === "manager" && (
            <>
              <Typography>Done </Typography>
              <Typography>
                <strong>20 </strong>
              </Typography>
            </>
          )}
          {userData.role === "admin" && (
            <>
              <Typography> Employees </Typography>
              <Typography>
                <strong> 50</strong>
              </Typography>
            </>
          )}
        </Grid>
      </Box>
    </Box>
  );
};
export default Topbar;
