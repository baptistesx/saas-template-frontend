import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import CustomAppBar from "../components/CustomAppBar";
import { signInWithGoogle } from "../firebase";

function SignIn({ onClick, error }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    data.preventDefault();

    setIsLoggingWithEmailAndPassword(true);

    onClick(email, password).then((res) => {
      console.log(res);

      setIsLoggingWithEmailAndPassword(false);
    });
    // const res = await loginWithEmailAndPassword(data);

    // if (res.error) {
    //   console.error(res.message);
    //   alert(res.message);
    // } else {
    //   if (res.isNewUser) {
    //     alert("Welcome newbie!");
    //   } else if (!res.isNewUser) {
    //     alert("Welcome back!");
    //   }
    //   console.log("usssseeerr id", res.id);
    //   localStorage.setItem("userId", res.id);
    //   // localStorage.setItem("email", res.data.email);
    //   // localStorage.setItem("isAdmin", res.data.isAdmin);

    //   history.push("/dashboard");
    // }
  };

  const onSignInWithGoogleClick = async () => {
    setIsLoggingWithGoogle(true);
    const res = await signInWithGoogle();

    setIsLoggingWithGoogle(false);

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
      localStorage.setItem("isAdmin", res.data.isAdmin);
      history.push("/dashboard");
    }
  };

  return (
    <div>
      <CustomAppBar />

      <Typography variant="h1" sx={{ textAlign: "center" }}>
        Sign In
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          padding: 1,
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ width: "45%", minWidth: "320px", m: 1 }}>
          <form onSubmit={onSignInClick}>
            <Card sx={{ p: 1 }}>
              <CardContent>
                <TextField
                  fullWidth
                  placeholder="Email"
                  {...register("email")}
                  required
                  sx={{ m: 1 }}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
                <TextField
                  fullWidth
                  type={"password"}
                  placeholder="Password"
                  {...register("password")}
                  required
                  sx={{ m: 1 }}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
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
      </Box>
    </div>
  );
}

export default SignIn;
