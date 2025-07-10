import { Box, Typography } from "@mui/material";

const Myprofile = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        boxShadow: 3,
        border: 2,
        ml: "21rem",
        mt: 2,
        borderRadius: 2,
        height: "50vh",
      }}
    >
      <Typography
        sx={{ fontWeight: "bold", textAlign: "center", fontSize: "1.2rem" }}
      >
        My Profile
      </Typography>

      <Box
        sx={{ display: "flex", justifyContent: "space-between", padding: 2 }}
      >
        <Box
          sx={{ display: "flex", flexDirection: "column", gap: 3, padding: 4 }}
        >
          <Typography>
            <strong>Name :</strong> {userData.name}
          </Typography>
          <Typography>
            {" "}
            <strong>Contact Number: </strong> {userData.contactnumber}
          </Typography>
          <Typography>
            {" "}
            <strong>Email:</strong> {userData.email}
          </Typography>
        </Box>

        <Box
          component={"img"}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJqngNJ42uWE0Zy6S6rHTuW8pn6p-cuogyQ&s"
          alt="Employee Image "
          sx={{
            borderRadius: 2,
            boxShadow: 3,
            padding: 4,
            margin: "0 20px",
          }}
        />
      </Box>
    </Box>
  );
};

export default Myprofile;
