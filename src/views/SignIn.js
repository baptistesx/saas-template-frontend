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
import { useAuth, useFirestore } from "reactfire";
import CustomAppBar from "../components/CustomAppBar";
import { loginWithEmailAndPassword, signInWithGoogle } from "../firebase";
import SignInForm from "../components/SignInForm";

function SignIn() {
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
        <SignInForm />
      </Box>
    </div>
  );
}

export default SignIn;
