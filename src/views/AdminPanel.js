import AddModeratorIcon from "@mui/icons-material/AddModerator";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RemoveModeratorIcon from "@mui/icons-material/RemoveModerator";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useFirestore } from "reactfire";
import CenteredLayout from "../components/CenteredLayout";
import CustomAppBar from "../components/CustomAppBar";
import { deleteUserById, getUsers, toggleAdminRights } from "../firebase";

function AdminPanel() {
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const db = useFirestore(); // a parent component contains a `FirebaseAppProvider`

  useEffect(() => {
    fetchData();
  }, []);

  const onRefreshClick = async () => {
    await fetchData();
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const res = await getUsers(db);

      setUsers([...res]);
    } catch (err) {
      setUsers([]);

      alert(err + " : Error fetching users");
    }

    setIsLoading(false);
  };

  const onDeleteClick = async (userId) => {
    setIsLoading(true);

    try {
      await deleteUserById(db, userId);
    } catch (err) {
      alert(err + " : Error deleting user");
    }

    await fetchData();

    setIsLoading(false);
  };

  const onToggleAdminRights = async (userId, isAdmin) => {
    setIsLoading(true);

    try {
      await toggleAdminRights(db, userId, isAdmin);

      setUsers(
        users.map((user) => {
          if (user.id === userId) {
            return { ...user, isAdmin: !isAdmin };
          }
          return user;
        })
      );
    } catch (err) {
      alert(err + " : Error toggling admin rights");
    }

    setIsLoading(false);
  };

  return (
    <div>
      <CustomAppBar />

      <CenteredLayout>
        <Typography variant="h1">Admin Panel</Typography>

        <Card>
          <CardContent>
            {users.length === 0 && isLoading ? (
              <Box />
            ) : (
              <Box>
                <Typography variant="body1">
                  {`${users.length} Available users`}
                </Typography>

                {users.length === 0 ? (
                  <Typography>No users</Typography>
                ) : (
                  <TableContainer component={Paper}>
                    <Table aria-label="users table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">Admin</TableCell>
                          <TableCell align="left">Licence expiration</TableCell>
                          <TableCell align="left">Email</TableCell>
                          <TableCell align="left">Actions</TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {users.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell component="th" scope="row">
                              {user.isAdmin ? <CheckIcon /> : <ClearIcon />}
                            </TableCell>

                            <TableCell component="th" scope="row">
                              {/* //TODO: handle licence */}
                              {/* {user.licenceExpiration
                                ? format(user.licenceExpiration, "d MMMM yyyy")
                                : ""} */}
                            </TableCell>

                            <TableCell component="th" scope="row">
                              {user.email}
                            </TableCell>

                            <TableCell align="left">
                              <Tooltip title="Toggle admin rights">
                                <IconButton
                                  aria-label="toggle-admin-rights"
                                  onClick={() =>
                                    onToggleAdminRights(user.id, user.isAdmin)
                                  }
                                  disabled={
                                    user.email === currentUser.email ||
                                    isLoading
                                  }
                                >
                                  {user.isAdmin ? (
                                    <RemoveModeratorIcon />
                                  ) : (
                                    <AddModeratorIcon />
                                  )}
                                </IconButton>
                              </Tooltip>

                              <Tooltip title="Edit user">
                                <IconButton
                                  disabled={
                                    user.email === currentUser.email ||
                                    isLoading
                                  }
                                >
                                  <EditIcon />
                                </IconButton>
                              </Tooltip>

                              <Tooltip title="Delete user">
                                <IconButton
                                  aria-label="delete"
                                  onClick={() => onDeleteClick(user.id)}
                                  disabled={
                                    user.email === currentUser.email ||
                                    isLoading
                                  }
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Box>
            )}
          </CardContent>

          <CardActions>
            <LoadingButton
              variant="contained"
              loading={isLoading}
              onClick={onRefreshClick}
              sx={{
                m: 1,
              }}
            >
              Refresh
            </LoadingButton>
          </CardActions>
        </Card>
      </CenteredLayout>
    </div>
  );
}

export default AdminPanel;
