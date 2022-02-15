import { Typography } from "@mui/material";
import CenteredLayout from "../../components/layout/CenteredLayout";
import CustomAppBar from "../../components/common/CustomAppBar";
import SignUpForm from "../../components/auth/SignUpForm";

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
