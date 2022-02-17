import { Typography } from "@mui/material";
import SignUpForm from "../../components/auth/SignUpForm";
import GlobalLayout from "../../components/layout/GlobalLayout";

function SignUp() {
  return (
    <GlobalLayout>
      <Typography variant="h1">Sign Up</Typography>

      <SignUpForm />
    </GlobalLayout>
  );
}

export default SignUp;
