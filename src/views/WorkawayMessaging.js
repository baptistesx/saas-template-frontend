import { Box, Typography } from "@mui/material";
import BotLogs from "../components/BotLogs";
import CustomAppBar from "../components/CustomAppBar";
import InfoForm from "../components/InfoForm";
function WorkawayMessaging() {
  return (
    <div>
      <CustomAppBar />

      {/* <CustomBodyLayout> */}
      <Typography variant="h1" sx={{ textAlign: "center" }}>
        Bot Workaway messaging
      </Typography>

      {/* <CustomStepper /> */}
      <Box sx={{ display: "flex" }}>
        <InfoForm />
        <BotLogs />
      </Box>
      {/* </CustomBodyLayout> */}
    </div>
  );
}

export default WorkawayMessaging;
