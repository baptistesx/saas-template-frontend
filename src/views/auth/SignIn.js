import { Typography } from "@mui/material";
import SignInForm from "../../components/auth/SignInForm";
import GlobalLayout from "../../components/layout/GlobalLayout";

function SignIn() {
  return (
    <GlobalLayout>
      <Typography variant="h1">Sign In</Typography>

      <SignInForm />
    </GlobalLayout>
  );
}

export default SignIn;
