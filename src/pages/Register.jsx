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
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } =
      formData;

    // Name validation
    if (!name.trim()) {
      Swal.fire("Error", "Please enter your name.", "error");
      return;
    }

    if (name.trim().length < 3) {
      Swal.fire(
        "Error",
        "Name must contain at least 3 characters.",
        "error"
      );
      return;
    }

    // Email validation
    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      Swal.fire(
        "Error",
        "Please enter a valid email address.",
        "error"
      );
      return;
    }

    // Password validation
    if (password.length < 6) {
      Swal.fire(
        "Error",
        "Password must contain at least 6 characters.",
        "error"
      );
      return;
    }

    // Confirm password
    if (password !== confirmPassword) {
      Swal.fire(
        "Error",
        "Passwords do not match.",
        "error"
      );
      return;
    }

    // Get existing users
    const existingUsers =
      JSON.parse(sessionStorage.getItem("users")) || [];

    // Check duplicate email
    const userExists = existingUsers.some(
      (user) =>
        user.email.toLowerCase() === email.toLowerCase()
    );

    if (userExists) {
      Swal.fire(
        "Email Already Exists",
        "Please use another email address.",
        "warning"
      );
      return;
    }

    // Create new user
    const newUser = {
      id: Date.now(),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: password,
    };

    // Save user
    existingUsers.push(newUser);

    sessionStorage.setItem(
      "users",
      JSON.stringify(existingUsers)
    );

    // Success
    Swal.fire({
      icon: "success",
      title: "Registration Successful!",
      text: "Please login to continue.",
      confirmButtonColor: "#7c4dff",
    }).then(() => {
      navigate("/login");
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
          maxWidth: 450,
          borderRadius: 4,
          boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
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
            Create Account
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              textAlign: "center",
              mb: 3,
            }}
          >
            Create your account and start organizing
            your music.
          </Typography>

          <Box
            component="form"
            onSubmit={handleRegister}
          >

            {/* NAME */}

            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaUser color="#7c4dff" />
                  </InputAdornment>
                ),
              }}
            />

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
                showPassword ? "text" : "password"
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

            {/* CONFIRM PASSWORD */}

            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              value={formData.confirmPassword}
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
                        setShowConfirmPassword(
                          !showConfirmPassword
                        )
                      }
                    >
                      {showConfirmPassword ? (
                        <FaEyeSlash />
                      ) : (
                        <FaEye />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* REGISTER BUTTON */}

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
              Register
            </Button>

          </Box>

          {/* LOGIN LINK */}

          <Typography
            sx={{
              textAlign: "center",
              mt: 3,
              fontSize: 14,
            }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "#7c4dff",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Login
            </Link>
          </Typography>

        </CardContent>
      </Card>
    </Box>
  );
}

export default Register;
