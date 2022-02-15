import { Box } from "@mui/system";
import React from "react";

const CenteredLayout = ({ children }) => {
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

export default CenteredLayout;
