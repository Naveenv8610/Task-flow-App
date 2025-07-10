import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import DeleteIcon from "@mui/icons-material/Delete";
import { use, useEffect, useState } from "react";

const Manageusers = () => {
  const [allusers, setAllUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const columns = [
    { field: "serialNo", headerName: "S.No", width: 90 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "contactnumber", headerName: "Contect Number", width: 150 },
    { field: "role", headerName: "Role", width: 150 },
    { field: "isApproved", headerName: "Approved", width: 150 },
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
          <Button
            sx={{ color: "red" }}
            endIcon={<DeleteIcon />}
            onClick={() => handleDelete(params.row._id)}
          />
        </Stack>
      ),
    },
  ];
  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:4000/api/delete/deleteUser/${id}`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (data) {
        alert("User Deleted Sucessfully...");
        setAllUsers((prevusers) => {
          const updatedUser = prevusers
            .filter((user) => user._id !== id)
            .map((user, index) => ({
              ...user,
              serialNo: index + 1,
            }));
          return updatedUser;
        });
      }
    } catch (error) {
      console.log("Error in deleting th user", error);
    }
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setIsDialogOpen(true);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/edit/eidtuser/${editUser._id}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(editUser),
        }
      );
      const data = await response.json();

      if (response.ok) {
        alert("User Updated Sucessfully...");

        setAllUsers((prevUsers) => {
          prevUsers.map((user) =>
            user._id === editUser._id
              ? { ...editUser, serialNo: user.serialNo }
              : user
          );
        });
        setIsDialogOpen(false);
        setEditUser(null);
      } else {
        alert(data.message || "Update Failed");
      }
    } catch (error) {
      console.log("Error in updating user", error);
      alert("Error in updating user");
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/getAll/getAllUsers");
        const data = await res.json();
        const userwithSerialno = data.users.map((user, index) => ({
          ...user,
          serialNo: index + 1,
        }));
        setAllUsers(userwithSerialno);
      } catch (error) {
        console.log("Error In getting users", error);
      }
    };
    fetchData();
  }, []);
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
      <Typography sx={{ fontWeight: "bold", textAlign: "center" }}>
        Manage Users
      </Typography>
      <Box>
        <DataGrid
          rows={allusers}
          columns={columns}
          checkboxSelection
          initialState={{
            pagination: { paginationModel: { pageSize: 8, page: 0 } },
          }}
          pageSizeOptions={[5, 10, 25, 50]}
          disableRowSelectionOnClick
          getRowId={(row) => row._id}
        />
      </Box>
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle
          sx={{ fontWeight: "bold", fontSize: "1.5rem", textAlign: "center" }}
        >
          Edit User Details
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            margin="dense"
            value={editUser?.name || ""}
            onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
          />
          <TextField
            label="Email"
            fullWidth
            margin="dense"
            value={editUser?.email || ""}
            onChange={(e) =>
              setEditUser({ ...editUser, email: e.target.value })
            }
          />
          <TextField
            label="Contact Number"
            fullWidth
            margin="dense"
            value={editUser?.contactnumber || ""}
            onChange={(e) =>
              setEditUser({ ...editUser, contactnumber: e.target.value })
            }
          />
          <TextField
            label="Role"
            fullWidth
            margin="dense"
            value={editUser?.role || ""}
            onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
          />
          <TextField
            label="Is Approved"
            fullWidth
            margin="dense"
            value={editUser?.isApproved || ""}
            onChange={(e) =>
              setEditUser({ ...editUser, isApproved: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={() => setIsDialogOpen(false)}> Cancel</Button>
          <Button variant="contained" onClick={handleUpdate}>
            {" "}
            Update
          </Button>
        </DialogActions>
      </Dialog>
      ;
    </Box>
  );
};

export default Manageusers;
