import { Box, Typography } from "@mui/material";
import GlobalLayout from "../../components/layout/GlobalLayout";
import BotLogs from "../../components/workawayBot/BotLogs";
import FilesSection from "../../components/workawayBot/FilesSection";
import InfoForm from "../../components/workawayBot/InfoForm";

function WorkawayBot() {
  return (
    <GlobalLayout>
      <Typography variant="h1">Workaway Bot</Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <InfoForm />
        
        <BotLogs />
      </Box>

      <FilesSection />
    </GlobalLayout>
  );
}

export default WorkawayBot;
