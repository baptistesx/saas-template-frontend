import { Typography } from "@mui/material";
import CustomAppBar from "../components/CustomAppBar";
import SignInForm from "../components/SignInForm";
import CenteredLayout from "../components/CenteredLayout";

function SignIn() {
  return (
    <div>
      <CustomAppBar />

      <CenteredLayout>
        <Typography variant="h1">
          Sign In
        </Typography>

        <SignInForm />
      </CenteredLayout>
    </div>
  );
}

export default SignIn;
