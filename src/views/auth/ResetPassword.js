import { Typography } from "@mui/material";
import ResetPasswordForm from "../../components/auth/ResetPasswordForm.js";
import GlobalLayout from "../../components/layout/GlobalLayout";

function ResetPassword() {
  return (
    <GlobalLayout>
      <Typography variant="h1">Reset password</Typography>

      <ResetPasswordForm />
    </GlobalLayout>
  );
}

export default ResetPassword;
