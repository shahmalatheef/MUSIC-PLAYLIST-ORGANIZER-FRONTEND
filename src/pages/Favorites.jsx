import React, { useEffect, useState } from "react";

import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  IconButton,
  Button,
  CircularProgress,
  Chip,
  Tooltip,
} from "@mui/material";

import {
  FaHeart,
  FaRegHeart,
  FaMusic,
  FaPlay,
  FaPause,
  FaTrash,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import { getAllSongs, updateSong } from "../services/apiServices";



function Favorites() {
  const navigate = useNavigate();

  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSong, setCurrentSong] = useState(null);

  const fetchFavorites = async () => {
    try {
      setLoading(true);

      const response = await getAllSongs();

      const favoriteSongs = response.data.filter(
        (song) => song.isFavorite === true
      );

      setSongs(favoriteSongs);
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Unable to load favorite songs.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  // REMOVE FAVORITE
  const removeFavorite = async (song) => {
    try {
      const updatedSong = {
        ...song,
        isFavorite: false,
      };

      await updateSong(song.id, updatedSong);

      setSongs((prevSongs) =>
        prevSongs.filter(
          (item) => item.id !== song.id
        )
      );

      if (currentSong?.id === song.id) {
        setCurrentSong(null);
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Unable to remove favorite.",
      });
    }
  };

  // PLAY
  const playSong = (song) => {
    if (!song.audioUrl) {
      Swal.fire({
        icon: "warning",
        title: "Audio Not Available",
        text: "This song does not have an audio file.",
      });

      return;
    }

    setCurrentSong(song);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: { xs: 4, md: 6 },
        background:
          "linear-gradient(135deg, #fff5f5, #ffffff, #f5f3ff)",
      }}
    >
      <Container maxWidth="lg">

        {/* HEADER */}
        <Box
          sx={{
            textAlign: "center",
            mb: 5,
          }}
        >
          <Box
            sx={{
              width: 70,
              height: 70,
              mx: "auto",
              mb: 2,
              borderRadius: "50%",
              background:
                "linear-gradient(135deg, #e53935, #c62828)",
              color: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow:
                "0 8px 25px rgba(229,57,53,0.2)",
            }}
          >
            <FaHeart size={30} />
          </Box>

          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
            }}
          >
            My Favorites
          </Typography>

          <Typography
            sx={{
              color: "#777",
              mt: 1,
            }}
          >
            Your favorite songs in one place.
          </Typography>
        </Box>

        {/* PLAYER */}
        {currentSong && (
          <Card
            sx={{
              mb: 4,
              borderRadius: 4,
              background:
                "linear-gradient(135deg, #211536, #512da8)",
              color: "#fff",
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  flexWrap: "wrap",
                }}
              >
                <FaMusic size={25} />

                <Box sx={{ flex: 1 }}>
                  <Typography fontWeight="bold">
                    {currentSong.title}
                  </Typography>

                  <Typography variant="body2">
                    {currentSong.artist}
                  </Typography>
                </Box>

                <audio
                  controls
                  autoPlay
                  src={currentSong.audioUrl}
                  style={{
                    width: "100%",
                    maxWidth: 500,
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        )}

        {/* LOADING */}
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              py: 8,
            }}
          >
            <CircularProgress
              sx={{ color: "#e53935" }}
            />
          </Box>
        ) : songs.length === 0 ? (
          /* EMPTY */
          <Card
            sx={{
              textAlign: "center",
              py: 8,
              borderRadius: 4,
            }}
          >
            <FaRegHeart
              size={55}
              color="#bbb"
            />

            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                mt: 2,
              }}
            >
              No Favorite Songs
            </Typography>

            <Typography
              sx={{
                color: "#888",
                mt: 1,
                mb: 3,
              }}
            >
              Tap the ❤️ icon on a song to add it
              to your favorites.
            </Typography>

            <Button
              variant="contained"
              onClick={() => navigate("/songs")}
              sx={{
                backgroundColor: "#7c4dff",
              }}
            >
              Browse Songs
            </Button>
          </Card>
        ) : (
          <>
            {/* COUNT */}
            <Typography
              sx={{
                mb: 3,
                color: "#666",
              }}
            >
              {songs.length} favorite{" "}
              {songs.length === 1
                ? "song"
                : "songs"}
            </Typography>

            {/* SONGS */}
            <Grid container spacing={3}>
              {songs.map((song) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={song.id}
                >
                  <Card
                    sx={{
                      height: "100%",
                      borderRadius: 4,
                      boxShadow:
                        "0 8px 25px rgba(0,0,0,0.07)",
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent:
                            "space-between",
                          mb: 2,
                        }}
                      >
                        <Box
                          sx={{
                            width: 55,
                            height: 55,
                            borderRadius: 3,
                            background:
                              "linear-gradient(135deg, #7c4dff, #512da8)",
                            color: "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent:
                              "center",
                          }}
                        >
                          <FaMusic />
                        </Box>

                        <Tooltip title="Remove favorite">
                          <IconButton
                            onClick={() =>
                              removeFavorite(song)
                            }
                            sx={{
                              color: "#e53935",
                            }}
                          >
                            <FaHeart />
                          </IconButton>
                        </Tooltip>
                      </Box>

                      <Typography
                        variant="h6"
                        fontWeight="bold"
                      >
                        {song.title}
                      </Typography>

                      <Typography
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        {song.artist}
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          flexWrap: "wrap",
                          mb: 2,
                        }}
                      >
                        <Chip
                          label={song.genre}
                          size="small"
                        />

                        <Chip
                          label={song.playlist}
                          size="small"
                          variant="outlined"
                        />
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent:
                            "space-between",
                          alignItems: "center",
                          borderTop:
                            "1px solid #eee",
                          pt: 2,
                        }}
                      >
                        <IconButton
                          onClick={() => {
                            if (
                              currentSong?.id ===
                              song.id
                            ) {
                              setCurrentSong(null);
                            } else {
                              playSong(song);
                            }
                          }}
                          sx={{
                            backgroundColor:
                              "#ede7f6",
                            color: "#7c4dff",
                          }}
                        >
                          {currentSong?.id ===
                          song.id ? (
                            <FaPause />
                          ) : (
                            <FaPlay />
                          )}
                        </IconButton>

                        <Button
                          onClick={() =>
                            navigate(
                              `/song-details/${song.id}`
                            )
                          }
                          sx={{
                            color: "#7c4dff",
                            textTransform: "none",
                          }}
                        >
                          View Details
                        </Button>
                      </Box>

                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Container>
    </Box>
  );
}

export default Favorites;
