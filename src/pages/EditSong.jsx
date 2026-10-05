import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  Card,
  CardContent,
  Grid,
} from "@mui/material";

import {
  FaMusic,
  FaSave,
  FaArrowLeft,
} from "react-icons/fa";

import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import { getSongById, updateSong } from "../services/apiServices";



function EditSong() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Form state
  const [songData, setSongData] = useState({
    title: "",
    artist: "",
    album: "",
    genre: "",
    duration: "",
    playlist: "",
    releaseYear: "",
  });

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  // Get song details
  useEffect(() => {
    const fetchSong = async () => {
      try {
        const response = await getSongById(id);

        setSongData({
          title: response.data.title || "",
          artist: response.data.artist || "",
          album: response.data.album || "",
          genre: response.data.genre || "",
          duration: response.data.duration || "",
          playlist: response.data.playlist || "",
          releaseYear: response.data.releaseYear || "",
        });
      } catch (error) {
        console.error("Error fetching song:", error);

        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Unable to load song details.",
          confirmButtonColor: "#7c4dff",
        });

        navigate("/songs");
      } finally {
        setPageLoading(false);
      }
    };

    fetchSong();
  }, [id, navigate]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setSongData({
      ...songData,
      [name]: value,
    });
  };

  // Update song
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !songData.title ||
      !songData.artist ||
      !songData.album ||
      !songData.genre ||
      !songData.duration ||
      !songData.playlist ||
      !songData.releaseYear
    ) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill in all fields.",
        confirmButtonColor: "#7c4dff",
      });

      return;
    }

    try {
      setLoading(true);

      const updatedSong = {
        ...songData,
        releaseYear: Number(songData.releaseYear),
      };

      await updateSong(id, updatedSong);

      Swal.fire({
        icon: "success",
        title: "Song Updated!",
        text: "Your song has been updated successfully.",
        confirmButtonColor: "#7c4dff",
      });

      navigate("/songs");

    } catch (error) {
      console.error("Error updating song:", error);

      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong while updating the song.",
        confirmButtonColor: "#7c4dff",
      });
    } finally {
      setLoading(false);
    }
  };

  // Loading screen
  if (pageLoading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #f5f1ff 0%, #ffffff 50%, #eee8ff 100%)",
        }}
      >
        <Typography
          sx={{
            color: "#7c4dff",
            fontWeight: 600,
            fontSize: "18px",
          }}
        >
          Loading song details...
        </Typography>
      </Box>
    );
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

        {/* PAGE HEADER */}
        <Box
          sx={{
            mb: 4,
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              width: 70,
              height: 70,
              borderRadius: "50%",
              backgroundColor: "#eee8ff",
              color: "#7c4dff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 15px",
            }}
          >
            <FaMusic size={30} />
          </Box>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: "#222",
            }}
          >
            Edit Song
          </Typography>

          <Typography
            sx={{
              color: "#777",
              mt: 1,
            }}
          >
            Update your song information
          </Typography>
        </Box>

        {/* FORM CARD */}
        <Card
          elevation={3}
          sx={{
            borderRadius: 4,
            p: {
              xs: 2,
              sm: 3,
              md: 4,
            },
          }}
        >
          <CardContent>

            <Box component="form" onSubmit={handleSubmit}>

              <Grid container spacing={3}>

                {/* SONG TITLE */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Song Title"
                    name="title"
                    value={songData.title}
                    onChange={handleChange}
                    placeholder="Enter song title"
                  />
                </Grid>

                {/* ARTIST */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Artist"
                    name="artist"
                    value={songData.artist}
                    onChange={handleChange}
                    placeholder="Enter artist name"
                  />
                </Grid>

                {/* ALBUM */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Album"
                    name="album"
                    value={songData.album}
                    onChange={handleChange}
                    placeholder="Enter album name"
                  />
                </Grid>

                {/* GENRE */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    fullWidth
                    label="Genre"
                    name="genre"
                    value={songData.genre}
                    onChange={handleChange}
                  >
                    <MenuItem value="Pop">
                      Pop
                    </MenuItem>

                    <MenuItem value="Rock">
                      Rock
                    </MenuItem>

                    <MenuItem value="Hip Hop">
                      Hip Hop
                    </MenuItem>

                    <MenuItem value="Classical">
                      Classical
                    </MenuItem>

                    <MenuItem value="Jazz">
                      Jazz
                    </MenuItem>
                  </TextField>
                </Grid>

                {/* DURATION */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Duration"
                    name="duration"
                    value={songData.duration}
                    onChange={handleChange}
                    placeholder="Example: 3:45"
                  />
                </Grid>

                {/* PLAYLIST */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    fullWidth
                    label="Playlist"
                    name="playlist"
                    value={songData.playlist}
                    onChange={handleChange}
                  >
                    <MenuItem value="Favorites">
                      Favorites
                    </MenuItem>

                    <MenuItem value="Workout">
                      Workout
                    </MenuItem>

                    <MenuItem value="Relax">
                      Relax
                    </MenuItem>

                    <MenuItem value="Chill">
                      Chill
                    </MenuItem>
                  </TextField>
                </Grid>

                {/* RELEASE YEAR */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Release Year"
                    name="releaseYear"
                    type="number"
                    value={songData.releaseYear}
                    onChange={handleChange}
                    placeholder="Example: 2024"
                  />
                </Grid>

                {/* BUTTONS */}
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 2,
                      mt: 2,
                      flexWrap: "wrap",
                    }}
                  >

                    {/* CANCEL */}
                    <Button
                      type="button"
                      variant="outlined"
                      startIcon={<FaArrowLeft />}
                      onClick={() => navigate("/songs")}
                      sx={{
                        minWidth: 130,
                        py: 1.3,
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
                      Cancel
                    </Button>

                    {/* UPDATE */}
                    <Button
                      type="submit"
                      variant="contained"
                      startIcon={<FaSave />}
                      disabled={loading}
                      sx={{
                        minWidth: 150,
                        py: 1.3,
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 600,
                        backgroundColor: "#7c4dff",
                        "&:hover": {
                          backgroundColor: "#633bdc",
                        },
                      }}
                    >
                      {loading ? "Updating..." : "Update Song"}
                    </Button>

                  </Box>
                </Grid>

              </Grid>

            </Box>

          </CardContent>
        </Card>

      </Container>
    </Box>
  );
}

export default EditSong;

