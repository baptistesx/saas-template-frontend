import { Box } from "@mui/system";
import React from "react";

const CustomBodyLayout = ({ children }) => {
  // const theme = useTheme();

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
