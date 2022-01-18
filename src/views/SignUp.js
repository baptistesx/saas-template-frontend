import { Box, Typography } from "@mui/material";
import CustomAppBar from "../components/CustomAppBar";
import SignUpForm from "../components/SignUpForm";

function SignUp() {
  return (
    <div>
      <CustomAppBar />

      <Typography variant="h1" sx={{ textAlign: "center" }}>
        Sign Up
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
        <SignUpForm />
      </Box>
    </div>
  );
}

export default SignUp;
