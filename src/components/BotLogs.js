import { LoadingButton } from "@mui/lab";
import { Box, Card, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
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
    </Card>
  );
};

export default BotLogs;
