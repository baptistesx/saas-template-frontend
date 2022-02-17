import { Typography } from "@mui/material";
import React from "react";
import GlobalLayout from "../components/layout/GlobalLayout";

function Home() {
  return (
    <GlobalLayout>
      <Typography variant="h1">Home</Typography>

      <Typography variant="body">
        Welcome on ImLazy.dev! You'll find here different ressources to save
        time in your life...
      </Typography>
    </GlobalLayout>
  );
}

export default Home;
