import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

const Approval = () => {
  const [unApprovedUsers, setUnapprovedUsers] = useState([]);
  const [approvedUserIds, setApprovedUserIds] = useState([]);

  const columns = [
    {
      field: "serialno",
      headerName: "S.No",
      width: 90,
    },
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "role", headerName: "Role", width: 170 },

    {
      field: "actions",
      headerName: "Actions",
      width: 210,
      renderCell: (params) => {
        const isApproved = approvedUserIds.includes(params.row._id);
        return (
          <Stack direction="row" sx={{ gap: 1, padding: 1 }}>
            {isApproved ? (
              <Button variant="contained" color="success" size="small">
                {" "}
                Accepted
              </Button>
            ) : (
              <>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleDelete(params.row._id)}
                >
                  Reject
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  onClick={() => handleApprove(params.row._id)}
                >
                  Accept
                </Button>
              </>
            )}
          </Stack>
        );
      },
    },
  ];
  const handleApprove = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:4000/api/update/approveUser/${id}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (data) {
        alert("User Approved Sucessufully...");
        setApprovedUserIds((prevuserIds) => [...prevuserIds, id]);
      }
    } catch (error) {
      console.log("Error in approve", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:4000/api/delete/deleteUser/${id}`,
        {
          method: "DELETE",
          headers: {
            "content-type": "appkication/json",
          },
        }
      );
      const data = await res.json();
      if (data) {
        alert("User Deleted Sucessfully...");

        setUnapprovedUsers((prevusers) => {
          const updatedUser = prevusers
            .filter((user) => user._id !== id)
            .map((user, index) => ({
              ...user,
              serialno: index + 1,
            }));
          return updatedUser;
        });
      }
    } catch (error) {
      console.log("Error in deleting user", error);
    }
  };

  useEffect(() => {
    const fetchedData = async () => {
      try {
        const res = await fetch(
          "http://localhost:4000/api/get/getAllUnApprovedUsers"
        );
        const data = await res.json();
        const userWithserinalno = data.users.map((user, index) => ({
          ...user,
          serialno: index + 1,
        }));

        setUnapprovedUsers(userWithserinalno);
      } catch (error) {
        console.log("Error in getting users", error);
      }
    };
    fetchedData();
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
        User Approval Requests
      </Typography>

      <Box>
        <DataGrid
          rows={unApprovedUsers}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 8, page: 0 } },
          }}
          // pageSizeOptions={[5, 10, 25, 50]}
          checkboxSelection
          disableRowSelectionOnClick
          getRowId={(row) => row._id}
        />
      </Box>
    </Box>
  );
};

export default Approval;
