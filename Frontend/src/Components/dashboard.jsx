import { Box } from "@mui/material";

import Sidebar from "./sidebar";
import Topbar from "./Topbar";
import Tasklist from "./tasklist";
import Update from "./update";
import Myprofile from "./myprofile";
import Createtask from "./createtask";
import Assigntask from "./Assigntask";
import TasksAssigned from "./tasksAssigned";
import Manageusers from "./manageusers";
import Approval from "./approval";
import ManageTasks from "./managetasks";
import { useState } from "react";

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState("");

  const renderComponent = () => {
    switch (activeComponent) {
      case "tasklistcomponent":
        return <Tasklist />;
      case "updatecomponent":
        return <Update />;
      case "profilecomponent":
        return <Myprofile />;
      case "createtaskcomponent":
        return <Createtask />;
      case "assigntaskcomponent":
        return <Assigntask />;
      case "assignedtaskscomponent":
        return <TasksAssigned />;
      case "manageuserscomponent":
        return <Manageusers />;
      case "appovalrequestcomponent":
        return <Approval />;
      case "managetasks":
        return <ManageTasks />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar onSelect={setActiveComponent} />
      <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <Topbar />
        {renderComponent()}
      </Box>
    </Box>
  );
};

export default Dashboard;
