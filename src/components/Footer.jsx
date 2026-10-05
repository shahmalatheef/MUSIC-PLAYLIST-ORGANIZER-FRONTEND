import React from "react";
import { Box, Typography, IconButton } from "@mui/material";

import {
  FaMusic,
  FaGithub,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#121212",
        color: "#fff",
        textAlign: "center",
        py: 4,
        mt: 5,
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
          mb: 1,
        }}
      >
        <FaMusic color="#7c4dff" />

        <Typography
          variant="h6"
          sx={{ fontWeight: "bold" }}
        >
          Music
          <span style={{ color: "#7c4dff" }}>
            Hub
          </span>
        </Typography>
      </Box>

      {/* Description */}
      <Typography
        variant="body2"
        sx={{
          color: "#aaa",
          mb: 2,
        }}
      >
        Organize your music, create playlists and
        manage your favorite songs.
      </Typography>

      {/* Social Icons */}
      <Box>
        <IconButton sx={{ color: "#fff" }}>
          <FaGithub />
        </IconButton>

        <IconButton sx={{ color: "#fff" }}>
          <FaInstagram />
        </IconButton>

        <IconButton sx={{ color: "#fff" }}>
          <FaLinkedin />
        </IconButton>
      </Box>

      {/* Copyright */}
      <Typography
        variant="body2"
        sx={{
          color: "#777",
          mt: 2,
        }}
      >
        © {new Date().getFullYear()} MusicHub.
        All Rights Reserved.
      </Typography>
    </Box>
  );
}

export default Footer;
