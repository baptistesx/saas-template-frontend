import { LoadingButton } from "@mui/lab";
import { Card, CardActions, CardContent, TextField } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const ResetPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onResetPasswordClick = (data) => {
    console.log(data);
  };

  return (
    <Box sx={{ width: "45%", minWidth: "320px", m: 1 }}>
      <form onSubmit={handleSubmit(onResetPasswordClick)}>
        <Card sx={{ p: 1 }}>
          <CardContent>
            <TextField
              fullWidth
              placeholder="Email"
              {...register("email")}
              required
              sx={{ m: 1 }}
            />
          </CardContent>
          <CardActions>
            <LoadingButton
              sx={{
                m: 1,
              }}
              type="submit"
              variant="contained"
              loading={isLoading}
            >
              Reset password
            </LoadingButton>
          </CardActions>
        </Card>
      </form>
    </Box>
  );
};

export default ResetPasswordForm;
