import React, { useEffect, useState } from "react";

import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Divider,
  CircularProgress,
} from "@mui/material";

import {
  FaMusic,
  FaArrowLeft,
  FaEdit,
} from "react-icons/fa";

import { useNavigate, useParams } from "react-router-dom";

import Swal from "sweetalert2";

import { getSongById } from "../services/apiServices";


function SongDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get song details
  useEffect(() => {
    const fetchSong = async () => {
      try {
        const response = await getSongById(id);

        setSong(response.data);
      } catch (error) {
        console.error("Error fetching song:", error);

        Swal.fire({
          icon: "error",
          title: "Song Not Found",
          text: "Unable to load song details.",
          confirmButtonColor: "#7c4dff",
        });

        navigate("/songs");
      } finally {
        setLoading(false);
      }
    };

    fetchSong();
  }, [id, navigate]);

  // Loading
  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(135deg, #f5f1ff 0%, #ffffff 50%, #eee8ff 100%)",
        }}
      >
        <CircularProgress sx={{ color: "#7c4dff" }} />
      </Box>
    );
  }

  // If no song
  if (!song) {
    return null;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #f5f1ff 0%, #ffffff 50%, #eee8ff 100%)",
        py: 5,
      }}
    >
      <Container maxWidth="md">

        {/* BACK BUTTON */}
        <Button
          startIcon={<FaArrowLeft />}
          onClick={() => navigate("/songs")}
          sx={{
            color: "#7c4dff",
            textTransform: "none",
            fontWeight: 600,
            mb: 3,
          }}
        >
          Back to Songs
        </Button>

        {/* DETAILS CARD */}
        <Card
          elevation={4}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
          }}
        >

          {/* TOP SECTION */}
          <Box
            sx={{
              background:
                "linear-gradient(135deg, #7c4dff, #b388ff)",
              color: "#fff",
              py: 5,
              px: 3,
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                backgroundColor: "rgba(255,255,255,0.2)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "0 auto 20px",
              }}
            >
              <FaMusic size={45} />
            </Box>

            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
              }}
            >
              {song.title}
            </Typography>

            <Typography
              sx={{
                mt: 1,
                opacity: 0.9,
                fontSize: "18px",
              }}
            >
              {song.artist}
            </Typography>
          </Box>

          {/* SONG INFORMATION */}
          <CardContent
            sx={{
              p: {
                xs: 2,
                sm: 4,
              },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 2,
              }}
            >
              Song Information
            </Typography>

            <Divider sx={{ mb: 2 }} />

            {/* ALBUM */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 2,
                py: 1.5,
                flexWrap: "wrap",
              }}
            >
              <Typography sx={{ color: "#777" }}>
                Album
              </Typography>

              <Typography sx={{ fontWeight: 600 }}>
                {song.album}
              </Typography>
            </Box>

            <Divider />

            {/* GENRE */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 2,
                py: 1.5,
                flexWrap: "wrap",
              }}
            >
              <Typography sx={{ color: "#777" }}>
                Genre
              </Typography>

              <Typography sx={{ fontWeight: 600 }}>
                {song.genre}
              </Typography>
            </Box>

            <Divider />

            {/* DURATION */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 2,
                py: 1.5,
                flexWrap: "wrap",
              }}
            >
              <Typography sx={{ color: "#777" }}>
                Duration
              </Typography>

              <Typography sx={{ fontWeight: 600 }}>
                {song.duration}
              </Typography>
            </Box>

            <Divider />

            {/* PLAYLIST */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 2,
                py: 1.5,
                flexWrap: "wrap",
              }}
            >
              <Typography sx={{ color: "#777" }}>
                Playlist
              </Typography>

              <Typography sx={{ fontWeight: 600 }}>
                {song.playlist}
              </Typography>
            </Box>

            <Divider />

            {/* RELEASE YEAR */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 2,
                py: 1.5,
                flexWrap: "wrap",
              }}
            >
              <Typography sx={{ color: "#777" }}>
                Release Year
              </Typography>

              <Typography sx={{ fontWeight: 600 }}>
                {song.releaseYear}
              </Typography>
            </Box>

            {/* ACTION BUTTONS */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 2,
                mt: 4,
                flexWrap: "wrap",
              }}
            >
              <Button
                variant="outlined"
                startIcon={<FaArrowLeft />}
                onClick={() => navigate("/songs")}
                sx={{
                  minWidth: 140,
                  py: 1.2,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                  color: "#7c4dff",
                  borderColor: "#7c4dff",
                  "&:hover": {
                    borderColor: "#633bdc",
                    backgroundColor: "#f5f1ff",
                  },
                }}
              >
                Back
              </Button>

              <Button
                variant="contained"
                startIcon={<FaEdit />}
                onClick={() =>
                  navigate(`/edit-song/${song.id}`)
                }
                sx={{
                  minWidth: 140,
                  py: 1.2,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                  backgroundColor: "#7c4dff",
                  "&:hover": {
                    backgroundColor: "#633bdc",
                  },
                }}
              >
                Edit Song
              </Button>
            </Box>

          </CardContent>
        </Card>

      </Container>
    </Box>
  );
}

export default SongDetails;


