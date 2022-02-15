import { Box, Typography } from "@mui/material";
import BotLogs from "../../components/workawayBot/BotLogs";
import CustomAppBar from "../../components/common/CustomAppBar";
import FilesSection from "../../components/workawayBot/FilesSection";
import InfoForm from "../../components/workawayBot/InfoForm";

function WorkawayMessaging() {
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
        <InfoForm />
        <BotLogs />
      </Box>

      <FilesSection />
    </div>
  );
}

export default WorkawayMessaging;
