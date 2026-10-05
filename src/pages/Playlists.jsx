import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  CircularProgress,
} from "@mui/material";

import {
  FaPlus,
  FaMusic,
  FaPlay,
  FaEdit,
  FaTrash,
  FaList,
} from "react-icons/fa";

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import { deleteSong, getPlaylistData, getPlaylistSongs } from "../services/apiServices";


function Playlists() {
  const navigate = useNavigate();

  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Playlist names
  const playlistNames = [
    "Favorites",
    "Workout",
    "Relax",
    "Chill",
  ];

  // Get all songs
  const fetchSongs = async () => {
    try {
      setLoading(true);

      const response = await getPlaylistData();

      setSongs(response.data);
    } catch (error) {
      console.error("Error fetching playlists:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Unable to load playlists.",
        confirmButtonColor: "#7c4dff",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  // Count songs in each playlist
  const getSongCount = (playlist) => {
    return songs.filter(
      (song) => song.playlist === playlist
    ).length;
  };

  // Get songs in playlist
  const handlePlay = async (playlist) => {
    try {
      const response = await getPlaylistSongs(playlist);

      if (response.data.length === 0) {
        Swal.fire({
          icon: "info",
          title: "Empty Playlist",
          text: "There are no songs in this playlist.",
          confirmButtonColor: "#7c4dff",
        });

        return;
      }

      Swal.fire({
        icon: "success",
        title: playlist,
        text: `${response.data.length} song(s) found in this playlist.`,
        confirmButtonColor: "#7c4dff",
      });

    } catch (error) {
      console.error("Error loading playlist:", error);
    }
  };

  // Delete playlist
  const handleDeletePlaylist = async (playlist) => {
    const playlistSongs = songs.filter(
      (song) => song.playlist === playlist
    );

    if (playlistSongs.length === 0) {
      Swal.fire({
        icon: "info",
        title: "Empty Playlist",
        text: "There are no songs to delete.",
        confirmButtonColor: "#7c4dff",
      });

      return;
    }

    const result = await Swal.fire({
      icon: "warning",
      title: "Delete Playlist?",
      text: `This will delete ${playlistSongs.length} song(s) from ${playlist}.`,
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d32f2f",
    });

    if (!result.isConfirmed) return;

    try {
      for (const song of playlistSongs) {
        await deleteSong(song.id);
      }

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: `${playlist} playlist has been deleted.`,
        confirmButtonColor: "#7c4dff",
      });

      fetchSongs();

    } catch (error) {
      console.error("Error deleting playlist:", error);

      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: "Unable to delete playlist.",
        confirmButtonColor: "#7c4dff",
      });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #f5f1ff 0%, #ffffff 50%, #eee8ff 100%)",
        py: 5,
      }}
    >
      <Container maxWidth="lg">

        {/* HEADER */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
            mb: 4,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: "#222",
              }}
            >
              My Playlists
            </Typography>

            <Typography
              sx={{
                color: "#777",
                mt: 0.5,
              }}
            >
              Organize your favorite songs into playlists
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<FaPlus />}
            onClick={() => navigate("/add-song")}
            sx={{
              backgroundColor: "#7c4dff",
              px: 3,
              py: 1.3,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "#633bdc",
              },
            }}
          >
            Add Song
          </Button>
        </Box>

        {/* SUMMARY */}
        <Card
          elevation={2}
          sx={{
            borderRadius: 3,
            mb: 4,
            p: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box
              sx={{
                width: 55,
                height: 55,
                borderRadius: 2,
                backgroundColor: "#eee8ff",
                color: "#7c4dff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FaList size={24} />
            </Box>

            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                }}
              >
                {playlistNames.length} Playlists
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: "#777",
                }}
              >
                {songs.length} songs in your collection
              </Typography>
            </Box>
          </Box>
        </Card>

        {/* LOADING */}
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: 250,
            }}
          >
            <CircularProgress sx={{ color: "#7c4dff" }} />
          </Box>
        ) : (
          <Grid container spacing={3}>

            {playlistNames.map((playlist, index) => {

              const count = getSongCount(playlist);

              const backgrounds = [
                "linear-gradient(135deg, #7c4dff, #b388ff)",
                "linear-gradient(135deg, #ff6b6b, #ff9f43)",
                "linear-gradient(135deg, #00b894, #55efc4)",
                "linear-gradient(135deg, #0984e3, #74b9ff)",
              ];

              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  key={playlist}
                >
                  <Card
                    sx={{
                      height: "100%",
                      borderRadius: 3,
                      transition: "0.3s",
                      "&:hover": {
                        transform: "translateY(-6px)",
                        boxShadow:
                          "0 15px 35px rgba(0,0,0,0.12)",
                      },
                    }}
                  >
                    <CardContent>

                      {/* PLAYLIST IMAGE */}
                      <Box
                        sx={{
                          height: 150,
                          borderRadius: 2,
                          background: backgrounds[index],
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#fff",
                          mb: 2,
                        }}
                      >
                        <FaMusic size={55} />
                      </Box>

                      {/* NAME */}
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                        }}
                      >
                        {playlist}
                      </Typography>

                      {/* SONG COUNT */}
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#777",
                          mt: 0.5,
                        }}
                      >
                        {count} {count === 1 ? "Song" : "Songs"}
                      </Typography>

                      {/* ACTIONS */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mt: 2,
                        }}
                      >
                        <Button
                          variant="contained"
                          startIcon={<FaPlay />}
                          size="small"
                          onClick={() =>
                            handlePlay(playlist)
                          }
                          sx={{
                            backgroundColor: "#7c4dff",
                            textTransform: "none",
                            borderRadius: 2,
                            "&:hover": {
                              backgroundColor: "#633bdc",
                            },
                          }}
                        >
                          View
                        </Button>

                        <Box>
                          <IconButton
                            onClick={() =>
                              navigate("/songs")
                            }
                            sx={{
                              color: "#7c4dff",
                            }}
                          >
                            <FaEdit />
                          </IconButton>

                          <IconButton
                            onClick={() =>
                              handleDeletePlaylist(
                                playlist
                              )
                            }
                            sx={{
                              color: "#d32f2f",
                            }}
                          >
                            <FaTrash />
                          </IconButton>
                        </Box>
                      </Box>

                    </CardContent>
                  </Card>
                </Grid>
              );
            })}

          </Grid>
        )}

      </Container>
    </Box>
  );
}

export default Playlists;
