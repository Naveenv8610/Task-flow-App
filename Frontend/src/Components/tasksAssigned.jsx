import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Button, Stack, Typography } from "@mui/material";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";

const paginationModel = { pdeadline: 0, pdeadlineSize: 7 };
const TasksAssigned = () => {
  const [allTasks, setAllTasks] = useState([]);
  const columns = [
    { field: "SerialNo", headerName: "S.No", width: 70 },
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
    {
      field: "assignedby",
      headerName: "Assigned By ",
      width: 200,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: () => (
        <Stack direction="row">
          <Button endIcon={<EditSquareIcon />} />
          <Button sx={{ color: "red" }} endIcon={<DeleteIcon />} />
        </Stack>
      ),
    },
  ];
  useEffect(() => {
    const fetAllTasks = async () => {
      const response = await fetch(
        "http://localhost:4000/api/get/getAllAssignedTasks",
        {
          method: "GET",
        }
      );
      const data = await response.json();

      const TakswithSerialNoAndAssignedData = data.Tasks.map((task, index) => ({
        _id: task._id,
        SerialNo: index + 1,
        employee: task.assignedTo?.name || "N/A",
        tasktitle: task.taskId?.taskTitle || "N/A",
        deadline: new Date(task.deadline),
        status: task.status,
        assignedby: task.assignedBy?.name || "N/A",
      }));
      setAllTasks(TakswithSerialNoAndAssignedData);
    };
    fetAllTasks();
  }, []);
  return (
    <Paper sx={{ ml: "21rem", mt: 2, height: 500, width: "78%" }}>
      <Typography
        sx={{ textAlign: "center", fontWeight: "bold", fontSize: "1.2rem" }}
      >
        {" "}
        Tasks Assigned List{" "}
      </Typography>
      <DataGrid
        rows={allTasks}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 7, page: 0 } },
        }}
        pageSizeOptions={[5, 10, 25, 50]}
        getRowId={(row) => row._id}
      />
    </Paper>
  );
};

export default TasksAssigned;
