import React, { useState } from "react";
import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const Navigate = useNavigate();
  const handleSubmit = async () => {
    let isValid = true;
    if (email.trim() === "") {
      setEmailError(true);
      isValid = false;
    }
    if (password.trim() === "") {
      setPasswordError(true);
      isValid = false;
    }
    if (!isValid) return;

    try {
      const response = await fetch("http://localhost:4000/api/login/signin", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      // console.log("This is user data", data.user);

      if (response.ok) {
        localStorage.setItem("userData", JSON.stringify(data.user));
        alert("Login Sucessfully....");
        Navigate("/home");
      } else if (response.status === 401) {
        alert("Invalid  Credentials");
      } else if (response.status === 404) {
        alert("User Not Found");
      } else if (response.status === 403) {
        alert("Account pending approval by admin");
      } else {
        alert(data.message || "Error during login please try agin");
      }
    } catch (error) {
      alert("Error During login ");
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        margin: "150px auto",
        boxShadow: "3",
        gap: 5,
        padding: 4,
        width: "50%",
      }}
    >
      <Typography
        sx={{ fontWeight: "bold", textAlign: "center", fontSize: "1.5rem" }}
      >
        Login
      </Typography>
      <TextField
        type="email"
        label="Email"
        value={email}
        onChange={(e) => {
          setEmailError(false);
          setEmail(e.target.value);
        }}
        error={emailError}
        helperText={emailError ? "Please enter valid email" : ""}
      />
      <TextField
        type="password"
        label="Password"
        value={password}
        onChange={(e) => {
          setPasswordError(false);
          setPassword(e.target.value);
        }}
        error={passwordError}
        helperText={passwordError ? "Please enter valid password":""}
      />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!email || !password}
        >
          Submit
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          cursor: "pointer",
        }}
      >
        <Link> Forgot Password?</Link>
        <Link href="/signup"> Sign up</Link>
      </Box>
    </Box>
  );
};
export default Login;
