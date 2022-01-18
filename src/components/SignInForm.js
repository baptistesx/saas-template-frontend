import { LoadingButton } from "@mui/lab";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useAuth, useFirestore } from "reactfire";
import { loginWithEmailAndPassword, signInWithGoogle } from "../firebase";

function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();
  const db = useFirestore();
  const [isLoggingWithGoogle, setIsLoggingWithGoogle] = useState(false);
  const [isLoggingWithEmailAndPassword, setIsLoggingWithEmailAndPassword] =
    useState(false);
  const history = useHistory();

  const {
    register,
    formState: { errors },
  } = useForm();

  const onSignInClick = async (data) => {
    data.preventDefault();

    setIsLoggingWithEmailAndPassword(true);

    const res = await loginWithEmailAndPassword({ auth, db, email, password });
    setIsLoggingWithEmailAndPassword(false);

    if (res.error) {
      console.error(res.message);
      alert(res.message);
    } else {
      if (res.isNewUser) {
        alert("Welcome newbie!");
      } else if (!res.isNewUser) {
        alert("Welcome back!");
      }

      history.push("/dashboard");
    }
  };

  const onSignInWithGoogleClick = async () => {
    setIsLoggingWithGoogle(true);
    const res = await signInWithGoogle({ auth, db });

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

      history.push("/dashboard");
    }
  };

  return (
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
  );
}

export default SignInForm;
