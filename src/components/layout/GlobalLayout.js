import { useTheme } from "@emotion/react";
import GroupIcon from "@mui/icons-material/Group";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material/";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import { useHistory } from "react-router-dom";
import { logout } from "../../api/functions";
const drawerWidth = 240;
function UserBloc() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Typography>
      {`${user?.is_admin ? "Admin," : ""}
      ${user?.is_premium ? "Premium, " : ""} ${user?.email}`}
    </Typography>
  );
}
const GlobalLayout = (props) => {
  const theme = useTheme();
  const { window, children } = props;

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const history = useHistory();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogoClick = () => {
    if (!user) {
      history.push("/");
    } else {
      history.push("/dashboard");
    }
  };

  const onLogoutClick = () => {
    logout();

    history.push("/");
  };

  const drawerItems = [
    { route: "/dashboard", icon: <HomeIcon />, title: "Home" },
  ];
  const currentSessionUser = JSON.parse(localStorage.getItem("user"));
  if (currentSessionUser?.is_admin) {
    drawerItems.push({
      route: "/admin-panel",
      icon: <GroupIcon />,
      title: "Users",
    });
  }
  const drawer = (
    <div>
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {drawerItems.map((element) => (
            <ListItem
              button
              key={element.title}
              component="a"
              href={element.route}
            >
              <ListItemIcon>{element.icon}</ListItemIcon>
              <ListItemText primary={element.title} />
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          // width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: theme.palette.primary.mainGradient,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Button onClick={handleLogoClick} style={{ textDecoration: "none" }}>
            <Typography
              variant="h6"
              component="div"
              noWrap
              sx={{ color: "white" }}
            >
              Im-Lazy
            </Typography>
          </Button>

          {user ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <UserBloc />

              <Typography>|</Typography>

              <Button sx={{ color: "white" }} onClick={onLogoutClick}>
                Logout
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button sx={{ color: "white" }} href="/signin">
                Sign In
              </Button>

              <Typography>|</Typography>

              <Button sx={{ color: "white" }} href="/signup">
                Sign Up
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {localStorage.getItem("user") ? (
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
      ) : (
        <Box />
      )}
      <Box
        component="main"
        sx={{
          p: 3,
          // width: { sm: `calc(100% - ${drawerWidth}px)` }
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default GlobalLayout;
