import { Box } from "@mui/system";
import React from "react";

const CustomBodyLayout = ({ children }) => {
  // const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        // justifyContent: "start",
        alignItems: "start",
        width: "50%",
      }}
    >
      {children}
    </Box>
  );
};

export default CustomBodyLayout;
