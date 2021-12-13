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
import { loginWithEmailAndPassword, signInWithGoogle } from "../firebase";

const SignInForm = () => {
  const theme = useTheme();
  const [isLoggingWithGoogle, setIsLoggingWithGoogle] = useState(false);
  const [isLoggingWithEmailAndPassword, setIsLoggingWithEmailAndPassword] =
    useState(false);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const onSignInClick = async (data) => {
    const res = await loginWithEmailAndPassword(data);

    if (res.error) {
      console.error(res.message);
      alert(res.message);
    } else {
      if (res.isNewUser) {
        alert("Welcome newbie!");
      } else if (!res.isNewUser) {
        alert("Welcome back!");
      }

      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("email", res.data.email);

      history.push("/dashboard");
    }
  };

  const onSignInWithGoogleClick = async () => {
    const res = await signInWithGoogle();

    if (res.error) {
      console.error(res.message);
      alert(res.message);
    } else {
      if (res.isNewUser) {
        alert("Welcome newbie!");
      } else if (!res.isNewUser) {
        alert("Welcome back!");
      }
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("email", res.data.email);
      history.push("/dashboard");
    }
  };

  return (
    <Box sx={{ width: "45%", minWidth: "320px", m: 1 }}>
      <form onSubmit={handleSubmit(onSignInClick)}>
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
          </CardContent>
          <CardActions>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isLoggingWithEmailAndPassword}
              sx={{
                m: 1,
              }}
            >
              Sign In
            </LoadingButton>

            <LoadingButton
              variant="contained"
              loading={isLoggingWithGoogle}
              sx={{
                m: 1,
              }}
              onClick={onSignInWithGoogleClick}
            >
              Sign In with Google
            </LoadingButton>

            <Button
              sx={{
                m: 1,
              }}
              href="/reset-password"
            >
              I forgot my password
            </Button>
          </CardActions>
        </Card>
      </form>
    </Box>
  );
};

export default SignInForm;