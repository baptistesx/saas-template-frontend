import { Card, Typography } from "@mui/material";
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

  useEffect(() => {
    if (socket === null) {
      setSocket(socketIOClient(ENDPOINT));
    }

    if (socket !== null && !isSocketInitialized) {
      setIsSocketInitialized(true);
      socket.on("connection", (log) => {
        setBotLogs((b) => [...b, log]);
      });

      socket.on("botLogs", (log) => {
        setBotLogs((b) => [...b, log]);
      });

      socket.on("botLogsMessageSent", (log) => {
        if (botLogsMessageSentIsFirst) {
          setBotLogs((b) => [...b, log]);
          botLogsMessageSentIsFirst = false;
        } else {
          setBotLogs((b) => [...b.slice(0, -1), log]);
        }
      });

      socket.on("botLogsMembersScrapped", (log) => {
        if (botLogsMembersScrappedIsFirst) {
          setBotLogs((b) => [...b, log]);
          botLogsMembersScrappedIsFirst = false;
        } else {
          setBotLogs((b) => [...b.slice(0, -1), log]);
        }
      });
    }
  }, [
    socket,
    botLogsMessageSentIsFirst,
    botLogsMembersScrappedIsFirst,
    isSocketInitialized,
  ]);

  return (
    <Card
      sx={{
        width: "45%",
        minWidth: "320px",
        m: 1,
        p: 1,
        display: "flex",
        bgcolor: "#353b48",
        color: "#ffffff",
        flexGrow: 1,
        flexDirection: "column",
      }}
    >
      {botLogs.map((log) => (
        <Typography key={log}>{log}</Typography>
      ))}
    </Card>
  );
};

export default BotLogs;
