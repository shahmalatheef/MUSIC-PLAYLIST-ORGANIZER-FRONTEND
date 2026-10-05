import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";

import {
  FaMusic,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const { email, password } = formData;

    // Email validation
    if (!email.trim()) {
      Swal.fire(
        "Error",
        "Please enter your email.",
        "error"
      );
      return;
    }

    // Password validation
    if (!password) {
      Swal.fire(
        "Error",
        "Please enter your password.",
        "error"
      );
      return;
    }

    // Get registered users
    const users =
      JSON.parse(sessionStorage.getItem("users")) || [];

    // Find user
    const user = users.find(
      (item) =>
        item.email.toLowerCase() ===
          email.toLowerCase().trim() &&
        item.password === password
    );

    // Invalid login
    if (!user) {
      Swal.fire(
        "Login Failed",
        "Invalid email or password.",
        "error"
      );
      return;
    }

    // Save logged-in user
    sessionStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    // Success
    Swal.fire({
      icon: "success",
      title: "Login Successful!",
      text: `Welcome ${user.name}`,
      confirmButtonColor: "#7c4dff",
    }).then(() => {
      navigate("/home");
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        py: 4,
        background:
          "linear-gradient(135deg, #6a1b9a, #7c4dff)",
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 430,
          borderRadius: 4,
          boxShadow:
            "0 15px 40px rgba(0,0,0,0.25)",
        }}
      >
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>

          {/* LOGO */}

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
              mb: 1,
            }}
          >
            <FaMusic
              size={28}
              color="#7c4dff"
            />

            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "#333",
              }}
            >
              Music
              <span style={{ color: "#7c4dff" }}>
                Hub
              </span>
            </Typography>
          </Box>

          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              mb: 1,
            }}
          >
            Welcome Back
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              textAlign: "center",
              mb: 3,
            }}
          >
            Login to continue to your music library.
          </Typography>

          <Box
            component="form"
            onSubmit={handleLogin}
          >

            {/* EMAIL */}

            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaEnvelope color="#7c4dff" />
                  </InputAdornment>
                ),
              }}
            />

            {/* PASSWORD */}

            <TextField
              fullWidth
              label="Password"
              name="password"
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaLock color="#7c4dff" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                    >
                      {showPassword ? (
                        <FaEyeSlash />
                      ) : (
                        <FaEye />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* LOGIN BUTTON */}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                py: 1.4,
                borderRadius: 2,
                fontWeight: "bold",
                backgroundColor: "#7c4dff",
                "&:hover": {
                  backgroundColor: "#651fff",
                },
              }}
            >
              Login
            </Button>

          </Box>

          {/* REGISTER LINK */}

          <Typography
            sx={{
              textAlign: "center",
              mt: 3,
              fontSize: 14,
            }}
          >
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{
                color: "#7c4dff",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Register
            </Link>
          </Typography>

        </CardContent>
      </Card>
    </Box>
  );
}

export default Login;
