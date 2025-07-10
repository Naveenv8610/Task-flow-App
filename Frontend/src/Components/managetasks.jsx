import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
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
} from "@mui/material";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect } from "react";
import { useState } from "react";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

const ManageTasks = () => {
  const [alltasks, setAllTasks] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectEmployee, setSelectEmployee] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [deadline, setDeadLine] = useState("");
  const [status, setStatus] = useState("");
  const [edittask, setEditTask] = useState(null);
  const columns = [
    { field: "serialNo", headerName: "S.No", width: 70 },
    { field: "employee", headerName: "Employee", width: 150 },
    { field: "tasktitle", headerName: "Task Title", width: 150 },
    {
      field: "deadline",
      headerName: "Deadline",
      type: "number",
      width: 90,
      renderCell: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString();
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
    },
    { field: "assignedby", headerName: "Assigned By", width: 100 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <Stack direction="row">
          <Button
            endIcon={<EditSquareIcon />}
            onClick={() => handleEdit(params.row)}
          />
          <Button sx={{ color: "red" }} endIcon={<DeleteIcon />} />
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
        }));
        setAllTasks(TaskwithSerialNo);
      } catch (error) {
        console.log("Error in fecting Tasks", error);
      }
    };

    fetchAllTasks();
  }, []);

  const handleEdit = (task) => {
    setIsDialogOpen(true);
    // setEditTask(task);
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
        {" "}
        Tasks Assigned List{" "}
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
        maxWidth="lg"
      >
        <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.3rem" }}>
          {" "}
          Edit Task Assignment{" "}
        </DialogTitle>
        <DialogContent>
          <Select
            label="Selct Employee"
            value={selectEmployee}
            fullWidth
            margin="dense"
            onChange={(e) => setSelectEmployee(e.target.value)}
          ></Select>
          <Select
            label="Selct Task"
            value={taskTitle}
            fullWidth
            margin="dense"
            onChange={(e) => setTaskTitle(e.target.value)}
          ></Select>
          {/* <DesktopDatePicker
            label="Deadline"
            value={deadline}
            onChange={(newvalue) => setDeadLine(newvalue)}
            renderInput={(params) => <TextField fullWidth {...params} />}
          /> */}
          <FormControl>
            <InputLabel> Status </InputLabel>
            <Select
              label="Status"
              value={status}
              margin="dense"
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="pending"> Pending</MenuItem>
              <MenuItem value="inprogress"> In Progress</MenuItem>
              <MenuItem value="completed"> Completed</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions
          sx={{ display: "flex", justifyContent: "center", margin: "dense" }}
        >
          <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          <Button variant="contained"> Update</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageTasks;
