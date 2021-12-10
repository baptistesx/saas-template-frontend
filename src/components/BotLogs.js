import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  FormControlLabel,
  Radio,
  Typography,
} from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import RadioGroup from "@mui/material/RadioGroup";
import axios from "axios";
import PropTypes from "prop-types";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

// TODO: move inside the compoenent?
let botLogsMessageSentIsFirst = true;
let botLogsMembersScrappedIsFirst = true;

const BotLogs = () => {
  const ENDPOINT = "http://localhost:4999";
  const [socket, setSocket] = useState(null);

  const [botLogs, setBotLogs] = useState([]);

  const [isSocketInitialized, setIsSocketInitialized] = useState(false);

  const [isClearing, setIsClearing] = useState(false);

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("Dione");
  const [citiesList, setCitiesList] = useState([]);
  const handleClickListItem = (cities) => {
    setCitiesList(cities);
    setOpen(true);
  };

  const handleClose = async (newValue) => {
    setOpen(false);

    if (newValue) {
      setValue(newValue);
      console.log("new value: ", newValue);
      const res = await axios.post(`http://localhost:4999/setCity`, {
        city: newValue,
      });
      console.log(res);
    }
  };

  useEffect(() => {
    if (socket === null) {
      setSocket(socketIOClient(ENDPOINT));
    }

    if (socket !== null && !isSocketInitialized) {
      setIsSocketInitialized(true);
      socket.on("connection", (log) => {
        setBotLogs((b) => [...b, log]);
        scrollLogsDown();
      });

      socket.on("botLogs", (log) => {
        if (log.constructor === Array) {
          setBotLogs((b) => [b[0], ...log]);
        } else {
          setBotLogs((b) => [...b, log]);
        }
        scrollLogsDown();
      });

      socket.on("botLogsMessageSent", (log) => {
        if (botLogsMessageSentIsFirst) {
          setBotLogs((b) => [...b, log]);
          botLogsMessageSentIsFirst = false;
        } else {
          setBotLogs((b) => [...b.slice(0, -1), log]);
        }
        scrollLogsDown();
      });

      socket.on("botLogsMembersScrapped", (log) => {
        if (botLogsMembersScrappedIsFirst) {
          setBotLogs((b) => [...b, log]);
          botLogsMembersScrappedIsFirst = false;
        } else {
          setBotLogs((b) => [...b.slice(0, -1), log]);
        }
        scrollLogsDown();
      });

      socket.on("citiesList", async (cities) => {
        console.log(cities);
        handleClickListItem(cities);
      });
    }
  }, [
    socket,
    botLogsMessageSentIsFirst,
    botLogsMembersScrappedIsFirst,
    isSocketInitialized,
  ]);

  const handleClickClearConsole = async () => {
    setIsClearing(true);

    const res = await axios.get(`http://localhost:4999/clearLogs`);

    if (res.status === 200) {
      setBotLogs((b) => []);
    }

    setIsClearing(false);
  };

  const scrollLogsDown = () => {
    var elem = document.querySelector("#logs");
    elem.scrollTop = elem.scrollHeight;
  };

  return (
    <Card
      id="logs"
      sx={{
        width: "45%",
        minWidth: "320px",
        maxHeight: "95vh",
        m: 1,
        p: 1,
        display: "flex",
        bgcolor: "#353b48",
        color: "#ffffff",
        flexGrow: 1,
        justifyContent: "space-between",
        flexDirection: "column",
        overflow: "auto",
      }}
    >
      <Box>
        {botLogs.map((log, index) => (
          <Typography key={log + index}>{log}</Typography>
        ))}
      </Box>

      <LoadingButton
        variant="contained"
        loading={isClearing}
        sx={{
          m: 1,
        }}
        disabled={false}
        onClick={handleClickClearConsole}
      >
        Clear logs
      </LoadingButton>

      <CitiesFormDialog
        id="ringtone-menu"
        keepMounted
        open={open}
        onClose={handleClose}
        value={value}
        cities={citiesList}
      />
    </Card>
  );
};

export default BotLogs;

function CitiesFormDialog(props) {
  const { onClose, value: valueProp, open, cities, ...other } = props;
  const [value, setValue] = useState(valueProp);
  const radioGroupRef = useRef(null);

  React.useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    console.log(value);
    onClose(value);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <DialogTitle>Phone Ringtone</DialogTitle>
      <DialogContent dividers>
        <RadioGroup
          ref={radioGroupRef}
          aria-label="ringtone"
          name="ringtone"
          value={value}
          onChange={handleChange}
        >
          {cities.map((option) => (
            <FormControlLabel
              value={option}
              key={option}
              control={<Radio />}
              label={option}
            />
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}

CitiesFormDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};
