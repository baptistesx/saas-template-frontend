import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import BotLogs from "../components/BotLogs";
import CustomAppBar from "../components/CustomAppBar";
import InfoForm from "../components/InfoForm";

function WorkawayMessaging() {
  const ENDPOINT = "http://localhost:4999";
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(socketIOClient(ENDPOINT));
  }, []);

  return (
    <div>
      <CustomAppBar />

      <Typography variant="h1" sx={{ textAlign: "center" }}>
        Bot Workaway messaging
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          padding: 1,
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        <InfoForm socket={socket} />
        <BotLogs socket={socket} />
      </Box>
    </div>
  );
}

export default WorkawayMessaging;
