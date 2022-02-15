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
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const db = useFirestore(); // a parent component contains a `FirebaseAppProvider`

  useEffect(async () => {
    onRefreshClick();
  }, []);

  const onRefreshClick = async () => {
    setIsLoading(true);

    const res = await getUsers(db);
    if (res?.error) {
      setUsers([]);
    } else {
      setUsers([...res]);
    }
    setIsLoading(false);
  };

  const onDeleteClick = async (userId) => {
    setIsLoading(true);

    const res = await deleteUserById(userId);
    console.log(res);
    setUsers([...res]);
    setIsLoading(false);
  };

  const onToggleAdminRightsClick = async (userId, isAdmin) => {
    const res = await toggleAdminRights(userId, isAdmin);

    if (res.error) {
      alert(res.message);
    } else {
      setUsers(
        users.map((user) => {
          if (user.id === userId) {
            return { ...user, isAdmin: res };
          }
          return user;
        })
      );
    }
  };

  return (
    <div>
      <CustomAppBar />

      <CenteredLayout>
        <Typography variant="h1">Admin Panel</Typography>

        <Card
          sx={{
            m: 1,
            p: 1,
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <CardContent>
            {users.length === 0 && isLoading ? (
              <Box />
            ) : (
              <>
                <Typography variant="body1">
                  {`${users.length} Available users`}
                </Typography>

                {users.length === 0 ? (
                  <Typography>No users</Typography>
                ) : (
                  <TableContainer component={Paper}>
                    <Table aria-label="files table">
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
                          <TableRow
                            key={user.id}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {user.isAdmin ? <CheckIcon /> : <ClearIcon />}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {/* {user.licenceExpiration
                                ? format(user.licenceExpiration, "d MMMM yyyy")
                                : ""} */}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {user.email}
                            </TableCell>
                            <TableCell align="left">
                              {user.isAdmin ? (
                                <Tooltip title="Remove admin rights">
                                  <IconButton
                                    aria-label="remove-moderator"
                                    onClick={() =>
                                      onToggleAdminRightsClick(
                                        user.id,
                                        user.isAdmin
                                      )
                                    }
                                    disabled={
                                      user.email ===
                                      localStorage.getItem("email")
                                    }
                                  >
                                    <RemoveModeratorIcon />
                                  </IconButton>
                                </Tooltip>
                              ) : (
                                <Tooltip title="Add admin rights">
                                  <IconButton
                                    aria-label="add-moderator"
                                    onClick={() =>
                                      onToggleAdminRightsClick(
                                        user.id,
                                        user.isAdmin
                                      )
                                    }
                                    disabled={
                                      user.email ===
                                      localStorage.getItem("email")
                                    }
                                  >
                                    <AddModeratorIcon />
                                  </IconButton>
                                </Tooltip>
                              )}

                              <Tooltip title="Delete user">
                                <IconButton
                                  aria-label="delete"
                                  onClick={() => onDeleteClick(user.id)}
                                  disabled={
                                    user.email === localStorage.getItem("email")
                                  }
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Edit user">
                                <IconButton
                                  disabled={
                                    user.email === localStorage.getItem("email")
                                  }
                                >
                                  <EditIcon />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </>
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
