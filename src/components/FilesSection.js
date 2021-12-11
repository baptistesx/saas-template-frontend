import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  IconButton,
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
    console.log("in useEffect");

    onRefreshClick();
  }, []);

  const onRefreshClick = async () => {
    console.log("in onRefreshClick");
    setIsRefreshing(true);
    const res = await axios.get(`${ENDPOINT}/filesName`);
    setFilesName([...res.data]);
    setIsRefreshing(false);
  };

  const onDownloadClick = async (name) => {
    console.log("download", name);
    const res = await axios.get(`${ENDPOINT}/file`, { params: { name } });
    console.log(JSON.parse(res.data));

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
    console.log("delete", name);
    const res = await axios.delete(`${ENDPOINT}/file`, { params: { name } });

    onRefreshClick();
  };

  return (
    <Card
      id="logs"
      sx={{
        minWidth: "320px",
        maxHeight: "80vh",
        m: 1,
        p: 1,
        display: "flex",
        flexGrow: 1,
        justifyContent: "space-between",
        flexDirection: "column",
        overflow: "auto",
      }}
    >
      <CardContent>
        <Typography variant="h2">Available files</Typography>

        {filesName.length === 0 ? (
          <Typography>No file available</Typography>
        ) : (
          filesName.map((name) => (
            <Box
              key={name}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography>{name}</Typography>
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
            </Box>
          ))
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
