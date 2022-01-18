import { Box } from "@mui/system";
import React from "react";

const CustomBodyLayout = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {children}
    </Box>
  );
};

export default CustomBodyLayout;
