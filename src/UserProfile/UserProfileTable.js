import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Button,
  Paper,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { UseMyCutomeHookForAllData } from "../MyCustomeStore/MyCustomeHookForProvideData";
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";

const UserProfileTable = () => {
  //this is for navigate
  const navigate = useNavigate();

  //this is for getting data from my custome hook
  const {
    allUsers,
    forGettingAllUsers,
    forGettingDataForEditTheProfileUser,
    profileUserData,
    setAddText,
    loading,
  } = UseMyCutomeHookForAllData();

  //this is for getting all users
  useEffect(() => {
    forGettingAllUsers();
  }, []);

  //this is for click on edit button
  const forClickOnEditbutton = (id) => {
    setAddText(false);
    forGettingDataForEditTheProfileUser(id);
    navigate(`/user/${id}/edit`);
  };

  //this is for click on the delete button
  const forClickOnDeleteButton = (id) => {
    forGettingDataForEditTheProfileUser(id);
    navigate(`/user/${id}/delete`);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "90%",
          margin: "0 auto",
          px: 2,
          py: 2,
          mt: 4,
          backgroundColor: "#f5f5f5",
          borderRadius: 2,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "#333",
          }}
        >
          All Profile Users
        </Typography>

        <Link to="/profile-user-form" style={{ textDecoration: "none" }}>
          <Button
            onClick={() => setAddText(true)}
            variant="contained"
            sx={{
              backgroundColor: "#007bff",
              color: "#fff",
              fontWeight: "bold",
              px: 3,
              py: 1.5,
              textTransform: "capitalize",
              "&:hover": {
                backgroundColor: "#0056b3",
                color: "#e6e6e6",
              },
            }}
          >
            Add User
          </Button>
        </Link>
      </Box>
      <Paper
        sx={{
          width: "90%",
          overflow: "hidden",
          margin: "20px auto",
          padding: 2,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <TableContainer>
          <Table aria-labelledby="tableTitle" size="medium">
            <TableHead sx={{ backgroundColor: "#3f51b5", color: "#fff" }}>
              <TableRow>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  ID
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  Name
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  Email
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  Password
                </TableCell>

                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  Gender
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  DOB
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  Edit
                </TableCell>
                <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
                  Delete
                </TableCell>
              </TableRow>
            </TableHead>
            {/* <TableBody>
              {allUsers.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user?.name}</TableCell>
                  <TableCell>{user?.email}</TableCell>
                  <TableCell>{user?.password}</TableCell>
                  <TableCell>{user?.gender}</TableCell>
                  <TableCell>
                    {" "}
                    {user?.dateOfBirth
                      ? format(new Date(user?.dateOfBirth), "yyyy-MM-dd")
                      : "Empty"}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => forClickOnEditbutton(user._id)}
                      sx={{
                        backgroundColor: "#8D77AB",
                        color: "#E1EACD",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "4px 10px",
                        borderRadius: "8px",
                        "&:hover": {
                          backgroundColor: "#2A004E",
                          color: "#fff",
                        },
                      }}
                      variant="contained"
                    >
                      <Edit sx={{ fontSize: 16 }} />{" "}
                    </Button>
                  </TableCell>

                  <TableCell>
                    <Button
                      onClick={() => forClickOnDeleteButton(user._id)}
                      sx={{
                        backgroundColor: "#FFCDD2",
                        color: "#D32F2F",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "4px 10px",
                        borderRadius: "8px",
                        "&:hover": {
                          backgroundColor: "#F44336",
                          color: "#fff",
                        },
                      }}
                      variant="contained"
                    >
                      <Delete sx={{ fontSize: 16 }} />{" "}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody> */}

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <CircularProgress size={30} />
                    <Typography variant="body1" style={{ marginTop: 10 }}>
                      Loading...
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                allUsers.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{user?.name}</TableCell>
                    <TableCell>{user?.email}</TableCell>
                    <TableCell>{user?.password}</TableCell>
                    <TableCell>{user?.gender}</TableCell>
                    <TableCell>
                      {user?.dateOfBirth
                        ? format(new Date(user?.dateOfBirth), "yyyy-MM-dd")
                        : "Empty"}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => forClickOnEditbutton(user._id)}
                        sx={{
                          backgroundColor: "#8D77AB",
                          color: "#E1EACD",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: "4px 10px",
                          borderRadius: "8px",
                          "&:hover": {
                            backgroundColor: "#2A004E",
                            color: "#fff",
                          },
                        }}
                        variant="contained"
                      >
                        <Edit sx={{ fontSize: 16 }} />
                      </Button>
                    </TableCell>

                    <TableCell>
                      <Button
                        onClick={() => forClickOnDeleteButton(user._id)}
                        sx={{
                          backgroundColor: "#FFCDD2",
                          color: "#D32F2F",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: "4px 10px",
                          borderRadius: "8px",
                          "&:hover": {
                            backgroundColor: "#F44336",
                            color: "#fff",
                          },
                        }}
                        variant="contained"
                      >
                        <Delete sx={{ fontSize: 16 }} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

export default UserProfileTable;
