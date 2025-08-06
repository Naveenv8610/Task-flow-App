import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  TextField,
} from "@mui/material";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect } from "react";
import { useState } from "react";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";

const ManageTasks = () => {
  const [alltasks, setAllTasks] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [employees, setEmployees] = useState([]);

  const [tasks, setTasks] = useState([]);
  const [deadline, setDeadline] = useState();

  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [tasktitle, setTaskTitle] = useState("");
  const [status, setStatus] = useState();
  const [selectedTask, setSelectedTask] = useState(null);

  const columns = [
    { field: "serialNo", headerName: "S.No", flex: 0.3 },
    { field: "employee", headerName: "Employee", flex: 0.7 },
    { field: "tasktitle", headerName: "Task Title", flex: 0.9 },
    {
      field: "deadline",
      headerName: "Deadline",
      type: "number",
      flex: 0.3,
      renderCell: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString();
      },
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.4,
    },
    { field: "assignedby", headerName: "Assigned By", flex: 0.6 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.6,
      renderCell: (params) => (
        <Stack direction="row">
          <Button
            endIcon={<EditSquareIcon />}
            onClick={() => handleEdit(params.row)}
          />
          <Button
            sx={{ color: "red" }}
            endIcon={<DeleteIcon />}
            onClick={() => handleDelete(params.row._id)}
          />
        </Stack>
      ),
    },
  ];
  useEffect(() => {
    const fetchAllTasks = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/get/getAllAssignedTasks",
          {
            method: "GET",
          }
        );
        const data = await response.json();

        const TaskwithSerialNo = data.Tasks.map((task, index) => ({
          _id: task._id,
          serialNo: index + 1,
          employee: task.assignedTo?.name || "N/A",
          tasktitle: task.taskId?.taskTitle || "N/A",
          deadline: new Date(task.deadline),
          status: task.status,
          assignedby: task.assignedBy?.name || "N/A",
          assignedTo: task.assignedTo,
          taskId: task.taskId,
        }));
        setAllTasks(TaskwithSerialNo);
        console.log("ALL Tasks ", TaskwithSerialNo);
      } catch (error) {
        console.log("Error in fecting Tasks", error);
      }
    };

    fetchAllTasks();
  }, []);
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
        console.log("EMployees ", data);
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

  const handleEdit = (Task) => {
    console.log("Task passed to Edit:", Task);
    console.log("taskId content:", Task.taskId);
    setSelectedTask(Task._id);
    setSelectedEmployee(Task.assignedTo?._id || "");
    setTaskTitle(Task.taskId?._id || "");
    setStatus(Task.status || "");
    setDeadline(Task.deadline || null);
    setIsDialogOpen(true);
  };
  console.log("All tasks", alltasks);

  const handleDelete = async (Task) => {
    try {
      const res = await fetch(
        `http://localhost:4000/api/delete/deleteTask/${Task}`,
        {
          method: "DELETE",
          headers: {
            "content-type": "applicationn/json",
          },
        }
      );
      const data = await res.json();
      if (data) {
        alert("Task Deleted Sucessfully..");
        setAllTasks((prevTasks) => {
          const UpdatedTask = prevTasks
            .filter((tasks) => tasks._id !== Task)
            .map((task, index) => ({
              ...task,
              serialNo: index + 1,
            }));
          return UpdatedTask;
        });
      }
    } catch (error) {
      console.log("Error while deleting the task ", error);
    }
  };

  const handleUpdate = async () => {
    const updatedTaskData = {
      assignedTo: selectedEmployee,
      taskId: tasktitle,
      status: status,
      deadline: deadline,
    };
    console.log("Upated Task data ", updatedTaskData);
    const response = await fetch(
      `http://localhost:4000/api/edit/editTask/${selectedTask}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(updatedTaskData),
      }
    );
    const data = await response.json();
    if (response.ok) {
      alert("Task Updated Sucessfully...");
      setIsDialogOpen(false);
    } else {
      alert(data.message || "Error in updating");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        boxShadow: 3,
        ml: "21rem",
        mt: 2,
        border: 2,
        height: "65vh",
        borderRadius: 2,
      }}
    >
      <Typography
        sx={{ textAlign: "center", fontWeight: "bold", fontSize: "1.2rem" }}
      >
        Tasks Assigned List
      </Typography>
      <DataGrid
        rows={alltasks}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 8, page: 0 } },
        }}
        pageSizeOptions={[5, 10, 25, 50]}
        getRowId={(row) => row._id}
      />
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        fullWidth
        margin="normal"
      >
        <DialogTitle
          sx={{ fontWeight: "bold", fontSize: "1.5rem", textAlign: "center" }}
        >
          Edit Task Details
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <InputLabel> Employee</InputLabel>
            <Select
              value={selectedEmployee}
              label="Employee"
              fullWidth
              onChange={(e) => setSelectedEmployee(e.target.value)}
            >
              {employees.map((employee) => (
                <MenuItem key={employee._id} value={employee._id}>
                  {employee.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel> Task Title</InputLabel>
            <Select
              value={tasktitle}
              label="Task Title"
              fullWidth
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
          <FormControl fullWidth margin="dense">
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
          <DesktopDatePicker
            label="Deadline"
            value={deadline ? dayjs(deadline) : null}
            fullWidth
            onChange={(newvalue) => setDeadline(newvalue)}
            renderInput={(params) => <TextField fullWidth {...params} />}
          />
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={() => setIsDialogOpen(false)}>cancel</Button>
          <Button variant="contained" onClick={handleUpdate}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageTasks;
