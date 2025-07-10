import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

const NoTasks = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        fontSize: "1.4rem",
        fontWeight: "bold",
      }}
    >
      No Tasks Available
    </div>
  );
};

const Tasklist = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchTasks = async () => {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const userId = userData.id;

      try {
        const response = await fetch(
          `http://localhost:4000/api/getTask/getAssignedTaskofUser/${userId}`,
          {
            method: "GET",
          }
        );
        const data = await response.json();

        // console.log("This is Tasks Info", data.AssignedTasks);
        const TaskWithSerialNo = data.AssignedTasks.map((task, index) => ({
          _id: task._id,
          SerialNo: index + 1,
          tasktitle: task.taskId?.taskTitle || "N/A",
          status: task.status,
          assignedby: task.assignedBy?.name || "N/A",
          deadline: new Date(task.deadline),
          description: task?.description || "N/A",
        }));
        setTasks(TaskWithSerialNo);
      } catch (error) {
        console.log("Error in fecting Tasks", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);
  const columns = [
    { field: "SerialNo", headerName: "S.No", flex: 0.1 },
    { field: "tasktitle", headerName: "Task Title", flex: 0.7 },
    { field: "status", headerName: "Status", flex: 0.3 },
    {
      field: "assignedby",
      headerName: "Assigned By",

      flex: 0.6,
    },
    {
      field: "deadline",
      headerName: "Dead Line",
      flex: 0.4,
      renderCell: (Params) => {
        const date = new Date(Params.value);
        return date.toLocaleDateString();
      },
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      renderCell: (params) => (
        <div
          style={{
            whiteSpace: "normal",
            wordWrap: "break-word",
            lineHeight: "1.4",
            padding: "5px",
          }}
        >
          {params.value}
        </div>
      ),
    },
  ];
  return (
    <Paper sx={{ ml: "21rem", mt: 2, height: 500, width: "78%" }}>
      <Typography
        sx={{ textAlign: "center", fontWeight: "bold", fontSize: "1.2rem" }}
      >
        {" "}
        Task List{" "}
      </Typography>
      {!loading && (
        <DataGrid
          rows={tasks}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 8, page: 0 } },
          }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 2, borderRadius: 2 }}
          getRowId={(row) => row._id}
          slots={{ noRowsOverlay: NoTasks }}
        />
      )}
    </Paper>
  );
};
export default Tasklist;
