import { Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const BotLogs = ({ socket }) => {
  // const [connectionMessage, setConnectionMessage] = useState("");
  const [botLogs, setBotLogs] = useState([]);

  const [botLogsMessageSentIsFirst, setBotLogsMessageSentIsFirst] =
    useState(true);
  const [botLogsMembersScrappedIsFirst, setBotLogsMembersScrappedIsFirst] =
    useState(true);

  if (socket !== null) {
    socket.on("connection", (log) => {
      setBotLogs([...botLogs, log]);
    });
  }

  useEffect(() => {
    console.log("in useEffect");
    if (socket !== null) {
      socket.on("botLogs", (log) => {
        setBotLogs([...botLogs, log]);
      });

      socket.on("botLogsMessageSent", (log) => {
        if (botLogsMessageSentIsFirst) {
          setBotLogs([...botLogs, log]);
          setBotLogsMessageSentIsFirst(false);
        } else {
          setBotLogs([...botLogs.slice(0, -1), log]);
        }
      });

      socket.on("botLogsMembersScrapped", (log) => {
        if (botLogsMembersScrappedIsFirst) {
          setBotLogs([...botLogs, log]);
          setBotLogsMembersScrappedIsFirst(false);
        } else {
          setBotLogs([...botLogs.slice(0, -1), log]);
        }
      });
    }
  }, [
    botLogs,
    // socket,
    botLogsMessageSentIsFirst,
    botLogsMembersScrappedIsFirst,
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
