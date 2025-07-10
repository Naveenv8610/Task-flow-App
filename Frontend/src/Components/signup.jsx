import {
  Box,
  Button,
  TextField,
  Link,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { useState } from "react";

const Signup = () => {
  const [signUpFormData, setSignUpFormData] = useState({
    name: "",
    contactnumber: "",
    email: "",
    password: "",
    role: "",
  });

  const [error, setError] = useState({
    name: false,
    contactnumber: false,
    email: false,
    password: false,
    role: false,
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setSignUpFormData((prev) => ({ ...prev, [name]: value }));

    if (value.trim() !== "") {
      setError((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleSubmit = async () => {
    let isValid = true;
    if (signUpFormData.name.trim() === "") {
      setError((prev) => ({ ...prev, name: true }));
      isValid = false;
    }

    if (signUpFormData.contactnumber.trim() === "") {
      setError((prev) => ({ ...prev, contactnumber: true }));
      isValid = false;
    }
    if (signUpFormData.email.trim() === "") {
      setError((prev) => ({ ...prev, email: true }));
      isValid = false;
    }
    if (signUpFormData.password.trim() === "") {
      setError((prev) => ({ ...prev, password: true }));
      isValid = false;
    }
    if (signUpFormData.role.trim() === "") {
      setError((prev) => ({ ...prev, role: true }));
    }

    if (!isValid) return;

    try {
      const response = await fetch(
        "http://localhost:4000/api/register/signup",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(signUpFormData),
        }
      );
      const data = await response.json();

      if (response.ok) {
        alert("User Resgistered Sucessfully...");
        setSignUpFormData({
          name: "",
          contactnumber: "",
          email: "",
          password: "",
          role: "",
        });
      } else if (response.status === 400) {
        alert("Email already Registered");
      } else {
        alert(data.message || "Error During signup , please tru again");
      }
    } catch (error) {
      alert("Error during signup , Please Try again");
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        boxShadow: 2,
        margin: "100px auto",
        padding: 4,
        gap: 4,
        width: "75%",
      }}
    >
      <Typography
        sx={{ fontWeight: "bold", textAlign: "center", fontSize: "1.5rem" }}
      >
        {" "}
        Sign Up{" "}
      </Typography>
      <TextField
        type="text"
        label="Name"
        name="name"
        value={signUpFormData.name}
        onChange={handleFormChange}
        error={error.name}
        helperText={error.name ? "Name is required" : ""}
      />
      <TextField
        type="tel"
        label="Contact Number"
        name="contactnumber"
        value={signUpFormData.contactnumber}
        onChange={handleFormChange}
        error={error.contactnumber}
        helperText={error.contactnumber ? "Contact number is required" : ""}
      />
      <TextField
        type="email"
        label="Email"
        name="email"
        value={signUpFormData.email}
        onChange={handleFormChange}
        error={error.email}
        helperText={error.email ? "Please enter valid email" : ""}
      />
      <TextField
        type="password"
        label="Password"
        name="password"
        value={signUpFormData.password}
        onChange={handleFormChange}
        error={error.password}
        helperText={error.password ? "Please enter password" : ""}
      />
      <FormControl>
        <InputLabel> Role</InputLabel>
        <Select
          label="Role"
          name="role"
          value={signUpFormData.role}
          onChange={handleFormChange}
          error={error.role}
          helperText={error.role ? "Please select role" : ""}
        >
          <MenuItem value="employee"> Employee</MenuItem>
          <MenuItem value="manager"> Manager </MenuItem>
        </Select>
      </FormControl>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          cursor: "pointer",
        }}
      >
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={
            !signUpFormData.name ||
            !signUpFormData.email ||
            !signUpFormData.contactnumber ||
            !signUpFormData.password ||
            !signUpFormData.role
          }
        >
          {" "}
          Submit
        </Button>
        <Link href="/"> Login</Link>
      </Box>
    </Box>
  );
};
export default Signup;
