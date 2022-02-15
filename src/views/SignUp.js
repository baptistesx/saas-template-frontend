import { Typography } from "@mui/material";
import CenteredLayout from "../components/CenteredLayout";
import CustomAppBar from "../components/CustomAppBar";
import SignUpForm from "../components/SignUpForm";

function SignUp() {
  return (
    <div>
      <CustomAppBar />

      <CenteredLayout>
        <Typography variant="h1">Sign Up</Typography>

        <SignUpForm />
      </CenteredLayout>
    </div>
  );
}

export default SignUp;
