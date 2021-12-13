import { LoadingButton } from "@mui/lab";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
} from "@mui/material";
import { Box, useTheme } from "@mui/system";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { registerWithEmailAndPassword } from "../firebase";

const SignUpForm = () => {
  const theme = useTheme();
  const [isSigningUp, setIsSigningUp] = useState(false);
  const history = useHistory();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const onRegisterClick = async (data) => {
    console.log(data);

    const res = await registerWithEmailAndPassword(data);

    if (res.error) {
      console.error(res.message);
      alert(res.message);
    } else {
      alert("Welcome newbie!");

      history.push("/dashboard");
    }
  };

  return (
    <Box sx={{ width: "45%", minWidth: "320px", m: 1 }}>
      <form onSubmit={handleSubmit(onRegisterClick)}>
        <Card sx={{ p: 1 }}>
          <CardContent>
            <TextField
              fullWidth
              placeholder="Email"
              {...register("email")}
              required
              sx={{ m: 1 }}
            />
            <TextField
              fullWidth
              type={"password"}
              placeholder="Password"
              {...register("password")}
              required
              sx={{ m: 1 }}
            />
            <TextField
              fullWidth
              type={"password"}
              placeholder="Confirm password"
              {...register("passwordConfirmation")}
              required
              sx={{ m: 1 }}
            />
          </CardContent>
          <CardActions>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSigningUp}
              sx={{
                m: 1,
              }}
            >
              Sign in
            </LoadingButton>

            <Button
              sx={{
                m: 1,
              }}
              href="/signin"
            >
              I already have an account
            </Button>
          </CardActions>
        </Card>
      </form>
    </Box>
  );
};

export default SignUpForm;
