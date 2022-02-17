import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Card, CardActions, CardContent, TextField } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Must be a valid email")
      .max(255)
      .required("Email is required"),
  })
  .required();

const ResetPasswordForm = () => {
  const [email, setEmail] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  //TODO: use snackbar
  const onSubmit = async (data) => {
    setIsLoading(true);

    //TODO
    //await resetPassword(email);

    setIsLoading(false);

    alert("Password reset link sent!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent>
          <TextField
            fullWidth
            placeholder="Email"
            {...register("email")}
            required
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <p>{errors.email?.message}</p>
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
  );
};

export default ResetPasswordForm;
