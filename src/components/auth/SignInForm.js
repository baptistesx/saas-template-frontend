import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { loginWithEmailAndPassword } from "../../backendFunctions";

//TODO: validate and update error message in direct live
const schema = yup
  .object({
    email: yup
      .string()
      .email("Must be a valid email")
      .max(255)
      .required("Email is required"),
    password: yup.string().min(6).max(255).required("Password is required"),
  })
  .required();

function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoggingWithEmailAndPassword, setIsLoggingWithEmailAndPassword] =
    useState(false);

  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsLoggingWithEmailAndPassword(true);

    const res = await loginWithEmailAndPassword({ email, password });

    setIsLoggingWithEmailAndPassword(false);

    welcomeAndRedirectUser(res);
  };

  //TODO: export this function? Also used in SignUpForm
  const welcomeAndRedirectUser = (res) => {
    //TODO: replace alert with snackbar
    if (res.error) {
      console.error(res.message);
      alert(res.message);
    } else {
      if (res.is_new_user) {
        alert("Welcome newbie!");
      } else if (!res.isNewUser) {
        alert("Welcome back!");
      }

      history.push("/dashboard");
    }
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
          {/* //TODO: style error messages */}
          <p>{errors.email?.message}</p>

          <TextField
            fullWidth
            type={"password"}
            placeholder="Password"
            {...register("password")}
            required
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          {/* //TODO: style error messages */}
          <p>{errors.password?.message}</p>
        </CardContent>

        <CardActions>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isLoggingWithEmailAndPassword}
          >
            Sign In
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
  );
}

export default SignInForm;
