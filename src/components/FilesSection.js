import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import { LoadingButton } from "@mui/lab";
import {
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
  Typography,
} from "@mui/material";
import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import { ENDPOINT } from "../utils/constants";

const FilesSection = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filesName, setFilesName] = useState([]);

  useEffect(async () => {
    onRefreshClick();
  }, []);

  const onRefreshClick = async () => {
    setIsRefreshing(true);
    const res = await axios.get(`${ENDPOINT}filesName`);
    setFilesName([...res.data]);
    setIsRefreshing(false);
  };

  const onDownloadClick = async (name) => {
    const res = await axios.get(`${ENDPOINT}file`, { params: { name } });

    // Create a blob with the data we want to download as a file
    const blob = new Blob([res.data], { type: "text/json" });
    // Create an anchor element and dispatch a click event on it
    // to trigger a download
    const a = document.createElement("a");
    a.download = name;
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  };

  const onDeleteClick = async (name) => {
    await axios.delete(`${ENDPOINT}file`, { params: { name } });

    onRefreshClick();
  };

  return (
    <Card
      sx={{
        m: 1,
        p: 1,
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      <CardContent>
        <Typography variant="h2">Available files</Typography>

        {filesName.length === 0 ? (
          <Typography>No file available</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table aria-label="files table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filesName.map((name) => (
                  <TableRow
                    key={name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {name}
                    </TableCell>
                    <TableCell align="left">
                      <IconButton
                        aria-label="download"
                        onClick={() => onDownloadClick(name)}
                      >
                        <DownloadIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() => onDeleteClick(name)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardContent>

      <CardActions>
        <LoadingButton
          variant="contained"
          loading={isRefreshing}
          onClick={onRefreshClick}
          sx={{
            m: 1,
          }}
        >
          Refresh
        </LoadingButton>
      </CardActions>
    </Card>
  );
};

export default FilesSection;
