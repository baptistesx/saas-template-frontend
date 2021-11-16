import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link } from "react-router-dom";

function CustomAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, color: "white" }}
            >
              Bots Dashboard
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default CustomAppBar;
