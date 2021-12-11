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
import { ENDPOINT } from "../utils/constants";

// TODO: move inside the compoenent?
let botLogsMessageSentIsFirst = true;

const BotLogs = () => {
  const [socket, setSocket] = useState(null);
  const [isSocketInitialized, setIsSocketInitialized] = useState(false);

  const [botLogs, setBotLogs] = useState([]);

  const [isClearingLogs, setIsClearingLogs] = useState(false);

  const [isOpenCitiesDialog, setIsOpenCitiesDialog] = React.useState(false);
  const [fullCitySelected, setFullCitySelected] = React.useState("Dione");
  const [cities, setCities] = useState([]);

  const handleOpenCitiesDialog = (citiesArray) => {
    setCities(citiesArray);

    setIsOpenCitiesDialog(true);
  };

  const handleCloseCitiesDialog = async (city) => {
    setIsOpenCitiesDialog(false);

    if (city) {
      setFullCitySelected(city);

      await axios.post(`${ENDPOINT}/setCity`, {
        city: city,
      });
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

      socket.on("citiesList", async (cities) => handleOpenCitiesDialog(cities));
    }
  }, [socket, botLogsMessageSentIsFirst, isSocketInitialized]);

  const handleClickClearConsole = async () => {
    setIsClearingLogs(true);

    const res = await axios.get(`${ENDPOINT}/clearLogs`);

    if (res.status === 200) {
      setBotLogs((b) => []);
    }

    setIsClearingLogs(false);
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
        minWidth: 320,
        minHeight: 400,
        maxHeight: "80vh",
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
        loading={isClearingLogs}
        sx={{
          m: 1,
        }}
        disabled={false}
        onClick={handleClickClearConsole}
      >
        Clear logs
      </LoadingButton>

      <CitiesFormDialog
        keepMounted
        open={isOpenCitiesDialog}
        onClose={handleCloseCitiesDialog}
        value={fullCitySelected}
        cities={cities}
      />
    </Card>
  );
};

export default BotLogs;

function CitiesFormDialog(props) {
  const { onClose, value: valueProp, open, cities, ...other } = props;
  const [value, setValue] = useState(valueProp);
  const radioGroupRef = useRef(null);

  useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
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
      <DialogTitle>Full city name</DialogTitle>
      <DialogContent dividers>
        <RadioGroup
          ref={radioGroupRef}
          aria-label="city"
          name="city"
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
