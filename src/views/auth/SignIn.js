import { Typography } from "@mui/material";
import CustomAppBar from "../../components/common/CustomAppBar";
import SignInForm from "../../components/auth/SignInForm";
import CenteredLayout from "../../components/layout/CenteredLayout";

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
