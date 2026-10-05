import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  MenuItem,
} from "@mui/material";

import {
  FaMusic,
  FaSave,
  FaArrowLeft,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { addSong } from "../services/apiServices";



function AddSong() {
  const navigate = useNavigate();

  const [songData, setSongData] = useState({
    title: "",
    artist: "",
    album: "",
    genre: "",
    duration: "",
    playlist: "",
    releaseYear: "",
    audioUrl: "",
    isFavorite: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSongData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !songData.title ||
      !songData.artist ||
      !songData.album ||
      !songData.genre ||
      !songData.duration ||
      !songData.playlist ||
      !songData.releaseYear ||
      !songData.audioUrl
    ) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill all fields including the audio URL.",
      });

      return;
    }

    try {
      setLoading(true);

      const newSong = {
        ...songData,
        releaseYear: Number(songData.releaseYear),
        isFavorite: false,
      };

      await addSong(newSong);

      await Swal.fire({
        icon: "success",
        title: "Song Added!",
        text: "Your song has been added successfully.",
        confirmButtonColor: "#7c4dff",
      });

      navigate("/songs");
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Unable to add song.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: { xs: 4, md: 6 },
        background:
          "linear-gradient(135deg, #f5f3ff, #ffffff, #f3efff)",
      }}
    >
      <Container maxWidth="md">

        {/* BACK BUTTON */}
        <Button
          startIcon={<FaArrowLeft />}
          onClick={() => navigate("/songs")}
          sx={{
            mb: 3,
            color: "#7c4dff",
            textTransform: "none",
          }}
        >
          Back to Songs
        </Button>

        <Card
          sx={{
            borderRadius: 4,
            boxShadow: "0 10px 35px rgba(0,0,0,0.08)",
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 5 } }}>

            {/* ICON */}
            <Box
              sx={{
                width: 70,
                height: 70,
                mx: "auto",
                mb: 2,
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg, #7c4dff, #512da8)",
                color: "#fff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FaMusic size={30} />
            </Box>

            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                mb: 1,
              }}
            >
              Add New Song
            </Typography>

            <Typography
              sx={{
                textAlign: "center",
                color: "#777",
                mb: 4,
              }}
            >
              Add a song to your music collection
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
            >

              <TextField
                fullWidth
                label="Song Title"
                name="title"
                value={songData.title}
                onChange={handleChange}
                margin="normal"
              />

              <TextField
                fullWidth
                label="Artist"
                name="artist"
                value={songData.artist}
                onChange={handleChange}
                margin="normal"
              />

              <TextField
                fullWidth
                label="Album"
                name="album"
                value={songData.album}
                onChange={handleChange}
                margin="normal"
              />

              <TextField
                fullWidth
                select
                label="Genre"
                name="genre"
                value={songData.genre}
                onChange={handleChange}
                margin="normal"
              >
                <MenuItem value="Pop">Pop</MenuItem>
                <MenuItem value="Rock">Rock</MenuItem>
                <MenuItem value="Hip Hop">Hip Hop</MenuItem>
                <MenuItem value="Jazz">Jazz</MenuItem>
                <MenuItem value="Classical">
                  Classical
                </MenuItem>
                <MenuItem value="R&B">R&B</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>

              <TextField
                fullWidth
                label="Duration"
                name="duration"
                placeholder="Example: 3:45"
                value={songData.duration}
                onChange={handleChange}
                margin="normal"
              />

              <TextField
                fullWidth
                select
                label="Playlist"
                name="playlist"
                value={songData.playlist}
                onChange={handleChange}
                margin="normal"
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

              <TextField
                fullWidth
                type="number"
                label="Release Year"
                name="releaseYear"
                value={songData.releaseYear}
                onChange={handleChange}
                margin="normal"
              />

              {/* AUDIO URL */}
              <TextField
                fullWidth
                label="Audio URL"
                name="audioUrl"
                placeholder="/songs/my-song.mp3"
                value={songData.audioUrl}
                onChange={handleChange}
                margin="normal"
                helperText="Example: /songs/perfect.mp3"
              />

              {/* BUTTONS */}
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  mt: 4,
                  flexDirection: {
                    xs: "column",
                    sm: "row",
                  },
                }}
              >
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => navigate("/songs")}
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    color: "#7c4dff",
                    borderColor: "#7c4dff",
                  }}
                >
                  Cancel
                </Button>

                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  startIcon={<FaSave />}
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    background:
                      "linear-gradient(135deg, #7c4dff, #512da8)",
                  }}
                >
                  {loading ? "Saving..." : "Save Song"}
                </Button>
              </Box>

            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default AddSong;
