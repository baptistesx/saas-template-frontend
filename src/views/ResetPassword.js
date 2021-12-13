import { Box, Typography } from "@mui/material";
import CustomAppBar from "../components/CustomAppBar";
import ResetPasswordForm from "../components/ResetPasswordForm";

function ResetPassword() {
  return (
    <div>
      <CustomAppBar />

      <Typography variant="h1" sx={{ textAlign: "center" }}>
        Reset password
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
        <ResetPasswordForm />
      </Box>
    </div>
  );
}

export default ResetPassword;
