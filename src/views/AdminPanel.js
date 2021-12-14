import { Typography } from "@mui/material";
import React from "react";
import CustomAppBar from "../components/CustomAppBar";
import CustomBodyLayout from "../components/CustomBodyLayout";

function AdminPanel() {
  return (
    <div>
      <CustomAppBar />

      <CustomBodyLayout>
        <Typography variant="h1">Admin Panel</Typography>
      </CustomBodyLayout>
    </div>
  );
}

export default AdminPanel;
