import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import CustomAppBar from "../components/CustomAppBar";
import CustomBodyLayout from "../components/CustomBodyLayout";

function Home() {
  return (
    <div>
      <CustomAppBar />

      <CustomBodyLayout>
        <Typography variant="h1" sx={{ textAlign: "center" }}>
          Welcome on ImLazy.dev!
        </Typography>

        <Card sx={{ p: 1 }}>
          <CardContent>
            <Typography variant="body">
              You'll find here different ressources to save time in your life...
            </Typography>
          </CardContent>
        </Card>
      </CustomBodyLayout>
    </div>
  );
}

export default Home;
