import { Typography } from "@mui/material";
import CenteredLayout from "../../components/layout/CenteredLayout";
import CustomAppBar from "../../components/common/CustomAppBar";
import ResetPasswordForm from "../../components/auth/ResetPasswordForm.js";

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
