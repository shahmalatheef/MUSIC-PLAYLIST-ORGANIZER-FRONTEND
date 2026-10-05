import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import {
  FaMusic,
  FaHome,
  FaList,
  FaCalendarAlt,
  FaChartPie,
  FaSun,
  FaMoon,
  FaBars,
  FaUser,
  FaSignOutAlt,
  FaHeart,
} from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Header({ darkMode, setDarkMode }) {
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  // Get logged-in user
  const user = JSON.parse(sessionStorage.getItem("user"));

  const menuItems = [
    {
      name: "Dashboard",
      path: "/home",
      icon: <FaHome />,
    },
    {
      name: "Songs",
      path: "/songs",
      icon: <FaMusic />,
    },
    {
  text: "Favorites",
  path: "/favorites",
  icon: <FaHeart />
},
    {
      name: "Playlists",
      path: "/playlist",
      icon: <FaList />,
    },
    {
      name: "Calendar",
      path: "/calendar",
      icon: <FaCalendarAlt />,
    },
    {
      name: "Reports",
      path: "/reports",
      icon: <FaChartPie />,
    },
  ];

  // Logout
  const handleLogout = () => {
    setAnchorEl(null);

    Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d32f2f",
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.removeItem("user");

        Swal.fire({
          title: "Logged Out!",
          text: "You have been successfully logged out.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

        navigate("/login");
      }
    });
  };

  // Theme change
  const handleThemeChange = () => {
    setDarkMode(!darkMode);

    sessionStorage.setItem(
      "theme",
      !darkMode ? "dark" : "light"
    );
  };

  // Close mobile drawer
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={2}
        sx={{
          backgroundColor: darkMode ? "#121212" : "#ffffff",
          color: darkMode ? "#ffffff" : "#222222",
        }}
      >
        <Toolbar
          sx={{
            minHeight: "70px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* LOGO */}
          <Box
            component={Link}
            to="/dashboard"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <FaMusic
              size={27}
              style={{
                color: "#7c4dff",
              }}
            />

            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                letterSpacing: 0.5,
              }}
            >
              Music<span style={{ color: "#7c4dff" }}>Hub</span>
            </Typography>
          </Box>

          {/* DESKTOP NAVIGATION */}
          {!isMobile && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              {menuItems.map((item) => (
                <Button
                  key={item.name}
                  component={Link}
                  to={item.path}
                  startIcon={item.icon}
                  sx={{
                    color: "inherit",
                    textTransform: "none",
                    fontWeight: 500,
                    px: 1.5,

                    "&:hover": {
                      color: "#7c4dff",
                      backgroundColor: darkMode
                        ? "#252525"
                        : "#f3f0ff",
                    },
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </Box>
          )}

          {/* RIGHT SIDE */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            {/* THEME BUTTON */}
            <IconButton
              onClick={handleThemeChange}
              sx={{
                color: "inherit",
              }}
              title="Change Theme"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </IconButton>

            {/* USER */}
            {!isMobile && (
              <>
                <IconButton
                  onClick={(event) =>
                    setAnchorEl(event.currentTarget)
                  }
                >
                  <Avatar
                    sx={{
                      width: 38,
                      height: 38,
                      backgroundColor: "#7c4dff",
                    }}
                  >
                    <FaUser size={16} />
                  </Avatar>
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}
                >
                  <MenuItem disabled>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600 }}
                    >
                      {user?.name || "User"}
                    </Typography>
                  </MenuItem>

                  <Divider />

                  <MenuItem onClick={handleLogout}>
                    <FaSignOutAlt
                      style={{
                        marginRight: "10px",
                      }}
                    />
                    Logout
                  </MenuItem>
                </Menu>
              </>
            )}

            {/* MOBILE MENU */}
            {isMobile && (
              <IconButton
                onClick={() => setDrawerOpen(true)}
                sx={{
                  color: "inherit",
                }}
              >
                <FaBars />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* MOBILE DRAWER */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerClose}
      >
        <Box
          sx={{
            width: 270,
            height: "100%",
            backgroundColor: darkMode
              ? "#121212"
              : "#ffffff",
            color: darkMode
              ? "#ffffff"
              : "#222222",
          }}
        >
          {/* Drawer Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              px: 2,
              py: 2,
              borderBottom: "1px solid",
              borderColor: darkMode
                ? "#333"
                : "#ddd",
            }}
          >
            <FaMusic
              size={22}
              style={{
                color: "#7c4dff",
              }}
            />

            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
              }}
            >
              MusicHub
            </Typography>
          </Box>

          {/* User */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              px: 2,
              py: 2,
            }}
          >
            <Avatar
              sx={{
                backgroundColor: "#7c4dff",
              }}
            >
              <FaUser size={16} />
            </Avatar>

            <Box>
              <Typography
                variant="body1"
                sx={{ fontWeight: 600 }}
              >
                {user?.name || "User"}
              </Typography>

              <Typography
                variant="caption"
                sx={{
                  color: darkMode
                    ? "#aaa"
                    : "#777",
                }}
              >
                Music Organizer
              </Typography>
            </Box>
          </Box>

          <Divider />

          {/* Mobile Navigation */}
          <List>
            {menuItems.map((item) => (
              <ListItem
                key={item.name}
                disablePadding
              >
                <ListItemButton
                  component={Link}
                  to={item.path}
                  onClick={handleDrawerClose}
                  sx={{
                    gap: 1.5,
                    py: 1.5,

                    "&:hover": {
                      backgroundColor: darkMode
                        ? "#252525"
                        : "#f3f0ff",
                      color: "#7c4dff",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "#7c4dff",
                    }}
                  >
                    {item.icon}
                  </Box>

                  <ListItemText
                    primary={item.name}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider />

          {/* Mobile Logout */}
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  handleDrawerClose();
                  handleLogout();
                }}
                sx={{
                  gap: 1.5,
                  py: 1.5,
                  color: "#d32f2f",
                }}
              >
                <FaSignOutAlt />

                <ListItemText
                  primary="Logout"
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default Header;