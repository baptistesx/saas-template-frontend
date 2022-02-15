import { Typography } from "@mui/material";
import CenteredLayout from "../components/CenteredLayout";
import CustomAppBar from "../components/CustomAppBar";
import ResetPasswordForm from "../components/ResetPasswordForm";

function ResetPassword() {
  return (
    <div>
      <CustomAppBar />

      <CenteredLayout>
        <Typography variant="h1">Reset password</Typography>

        <ResetPasswordForm />
      </CenteredLayout>
    </div>
  );
}

export default ResetPassword;
