import React, { useEffect, useRef } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

import {
  FaMusic,
  FaList,
  FaChartPie,
  FaCalendarAlt,
  FaArrowRight,
} from "react-icons/fa";

import { Link } from "react-router-dom";

import gsap from "gsap";
import AOS from "aos";
import "aos/dist/aos.css";

function Home() {
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    // AOS
    AOS.init({
      duration: 1000,
      once: true,
    });

    // GSAP
    const timeline = gsap.timeline();

    timeline
      .fromTo(
        titleRef.current,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        }
      )
      .fromTo(
        textRef.current,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.5"
      )
      .fromTo(
        buttonRef.current,
        {
          scale: 0.8,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
        },
        "-=0.4"
      );

    return () => {
      timeline.kill();
    };
  }, []);

  const features = [
    {
      icon: <FaMusic />,
      title: "Manage Songs",
      text: "Add, edit, delete and organize all your favorite songs.",
    },
    {
      icon: <FaList />,
      title: "Create Playlists",
      text: "Organize songs into playlists based on your preferences.",
    },
    {
      icon: <FaChartPie />,
      title: "Music Analytics",
      text: "View useful charts and statistics about your music collection.",
    },
    {
      icon: <FaCalendarAlt />,
      title: "Release Calendar",
      text: "Keep track of song release years and important music dates.",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #f5f1ff 0%, #ffffff 50%, #eee8ff 100%)",
        overflow: "hidden",
      }}
    >
      {/* HERO SECTION */}
      <Container maxWidth="lg">
        <Grid
          container
          spacing={5}
          alignItems="center"
          sx={{
            minHeight: {
              xs: "auto",
              md: "75vh",
            },
            py: {
              xs: 8,
              md: 5,
            },
          }}
        >
          {/* LEFT CONTENT */}
          <Grid item xs={12} md={6}>
            <Typography
              ref={titleRef}
              variant="h2"
              sx={{
                fontWeight: 800,
                fontSize: {
                  xs: "2.5rem",
                  sm: "3.5rem",
                  md: "4rem",
                },
                lineHeight: 1.15,
                color: "#222",
              }}
            >
              Your Music.
              <br />

              <span style={{ color: "#7c4dff" }}>
                Your Playlists.
              </span>
            </Typography>

            <Typography
              ref={textRef}
              variant="h6"
              sx={{
                mt: 3,
                maxWidth: 550,
                color: "#666",
                lineHeight: 1.7,
                fontWeight: 400,
              }}
            >
              Organize your favorite songs, create playlists,
              explore your music collection and discover
              meaningful insights in one simple platform.
            </Typography>

            {/* BUTTONS */}
            <Box
              ref={buttonRef}
              sx={{
                mt: 4,
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              <Button
                component={Link}
                to="/add-song"
                variant="contained"
                size="large"
                endIcon={<FaArrowRight />}
                sx={{
                  backgroundColor: "#7c4dff",
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,

                  "&:hover": {
                    backgroundColor: "#633bdc",
                  },
                }}
              >
                Add Songs
              </Button>

              {/* <Button
                component={Link}
                to="/login"
                variant="outlined"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                  borderColor: "#7c4dff",
                  color: "#7c4dff",

                  "&:hover": {
                    borderColor: "#633bdc",
                    color: "#633bdc",
                  },
                }}
              >
                Login
              </Button> */}
            </Box>
          </Grid>

          {/* RIGHT MUSIC IMAGE/CIRCLE */}
          <Grid item xs={12} md={6}>
            <Box
              data-aos="fade-left"
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: {
                    xs: 260,
                    sm: 350,
                    md: 430,
                  },
                  height: {
                    xs: 260,
                    sm: 350,
                    md: 430,
                  },
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, #7c4dff, #b388ff)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow:
                    "0 25px 60px rgba(124, 77, 255, 0.3)",
                }}
              >
                <FaMusic size={150} color="#fff" />
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* FEATURES */}
        <Box
          sx={{
            py: {
              xs: 6,
              md: 10,
            },
          }}
        >
          <Typography
            variant="h4"
            align="center"
            data-aos="fade-up"
            sx={{
              fontWeight: 700,
              mb: 1,
            }}
          >
            Everything You Need
          </Typography>

          <Typography
            variant="body1"
            align="center"
            data-aos="fade-up"
            sx={{
              color: "#666",
              mb: 5,
            }}
          >
            Manage your entire music collection easily.
          </Typography>

          <Grid
            container
            spacing={3}
            justifyContent="center"
          >
            {features.map((feature, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                key={index}
              >
                <Card
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  sx={{
                    height: "100%",
                    textAlign: "center",
                    borderRadius: 3,
                    transition: "0.3s",

                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow:
                        "0 15px 35px rgba(0,0,0,0.12)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        mx: "auto",
                        mb: 2,
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#eee8ff",
                        color: "#7c4dff",
                        fontSize: 25,
                      }}
                    >
                      {feature.icon}
                    </Box>

                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        mb: 1,
                      }}
                    >
                      {feature.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        color: "#666",
                        lineHeight: 1.7,
                      }}
                    >
                      {feature.text}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* BOTTOM CTA */}
        <Box
          data-aos="zoom-in"
          sx={{
            textAlign: "center",
            backgroundColor: "#7c4dff",
            color: "#fff",
            borderRadius: 4,
            py: {
              xs: 5,
              md: 7,
            },
            px: 2,
            mb: 7,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 2,
              fontSize: {
                xs: "1.8rem",
                md: "2.3rem",
              },
            }}
          >
            Start Organizing Your Music
          </Typography>

          <Typography
            sx={{
              mb: 3,
              opacity: 0.9,
            }}
          >
            Create your account and manage your music
            collection today.
          </Typography>

          <Button
            component={Link}
            to="/register"
            variant="contained"
            sx={{
              backgroundColor: "#fff",
              color: "#7c4dff",
              px: 4,
              py: 1.3,
              textTransform: "none",
              fontWeight: 700,

              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            }}
          >
            Create Account
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default Home;
