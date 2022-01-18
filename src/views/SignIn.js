import { Box, Typography } from "@mui/material";
import CustomAppBar from "../components/CustomAppBar";
import SignInForm from "../components/SignInForm";

function SignIn() {
  return (
    <div>
      <CustomAppBar />

      <Typography variant="h1" sx={{ textAlign: "center" }}>
        Sign In
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
        <SignInForm />
      </Box>
    </div>
  );
}

export default SignIn;
