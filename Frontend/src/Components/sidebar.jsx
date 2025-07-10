import { Box, Button } from "@mui/material";
import React from "react";
import CompanyLogo from "../../src/images/sslogoglobal.png";

const Sidebar = ({ onSelect }) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  return (
    <Box
      sx={{
        boxShadow: 3,
        height: "100vh",
        width: "300px",
        padding: 2,
        backgroundColor: "GrayText",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 5,
        }}
      >
        <img
          src={CompanyLogo}
          alt="logo"
          style={{
            width: "200px",
            height: "80px",
          }}
        />
        {userData.role === "employee" && (
          <>
            <Button
              variant="contained"
              onClick={() => onSelect("tasklistcomponent")}
            >
              Task List
            </Button>
            <Button
              variant="contained"
              onClick={() => onSelect("updatecomponent")}
            >
              Update Task
            </Button>
          </>
        )}
        {userData.role === "manager" && (
          <>
            <Button
              variant="contained"
              onClick={() => onSelect("createtaskcomponent")}
            >
              Create Task
            </Button>
            <Button
              variant="contained"
              onClick={() => onSelect("assigntaskcomponent")}
            >
              {" "}
              Assign Task{" "}
            </Button>
            <Button
              variant="contained"
              onClick={() => onSelect("assignedtaskscomponent")}
            >
              Tasks Assigned
            </Button>
          </>
        )}
        {userData.role === "admin" && (
          <>
            <Button
              variant="contained"
              onClick={() => onSelect("manageuserscomponent")}
            >
              Manage Users
            </Button>
            <Button
              variant="contained"
              onClick={() => onSelect("appovalrequestcomponent")}
            >
              {" "}
              Pending Approvals{" "}
            </Button>

            <Button
              variant="contained"
              onClick={() => onSelect("createtaskcomponent")}
            >
              {" "}
              Create Task
            </Button>
            <Button
              variant="contained"
              onClick={() => onSelect("assigntaskcomponent")}
            >
              {" "}
              Assign Task
            </Button>
            <Button
              variant="contained"
              onClick={() => onSelect("managetasks")}
            >
              {" "}
              Manage Tasks{" "}
            </Button>
          </>
        )}

        <Button
          variant="contained"
          onClick={() => onSelect("profilecomponent")}
        >
          My Profile{" "}
        </Button>
      </Box>
    </Box>
  );
};

export default Sidebar;
