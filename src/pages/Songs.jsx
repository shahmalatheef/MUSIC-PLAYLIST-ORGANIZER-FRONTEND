import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  MenuItem,
  Card,
  CardContent,
  Grid,
  IconButton,
  CircularProgress,
  Pagination,
  Chip,
} from "@mui/material";

import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaMusic,
  FaEye,
  FaHeart,
  FaRegHeart,
  FaPlay,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


import MusicPlayer from "../components/MusicPlayer";

import { deleteSong, getAllSongs, updateSong } from "../services/apiServices";

function Songs() {
  const navigate = useNavigate();

  const [songs, setSongs] = useState([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");
  const [playlist, setPlaylist] = useState("All");

  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(6);

  const [selectedSong, setSelectedSong] = useState(null);

  // =========================
  // GET SONGS
  // =========================

  const fetchSongs = async () => {
    try {
      setLoading(true);

      const response = await getAllSongs();

      setSongs(response.data);
    } catch (error) {
      console.error(error);

      Swal.fire(
        "Error",
        "Unable to load songs.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  // =========================
  // DELETE
  // =========================

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Song?",
      text: "This song will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteSong(id);

      Swal.fire(
        "Deleted!",
        "Song deleted successfully.",
        "success"
      );

      fetchSongs();
    } catch (error) {
      console.error(error);

      Swal.fire(
        "Error",
        "Unable to delete song.",
        "error"
      );
    }
  };

  // =========================
  // FAVORITE
  // =========================

  const handleFavorite = async (song) => {
    try {
      await updateFavorite(
        song.id,
        !song.isFavorite
      );

      setSongs((previousSongs) =>
        previousSongs.map((item) =>
          item.id === song.id
            ? {
                ...item,
                isFavorite: !item.isFavorite,
              }
            : item
        )
      );
    } catch (error) {
      console.error(error);

      Swal.fire(
        "Error",
        "Unable to update favorite.",
        "error"
      );
    }
  };

  // =========================
  // SEARCH + FILTER
  // =========================

  const filteredSongs = songs.filter((song) => {
    const searchValue = search.toLowerCase();

    const matchesSearch =
      song.title
        ?.toLowerCase()
        .includes(searchValue) ||
      song.artist
        ?.toLowerCase()
        .includes(searchValue) ||
      song.album
        ?.toLowerCase()
        .includes(searchValue);

    const matchesGenre =
      genre === "All" || song.genre === genre;

    const matchesPlaylist =
      playlist === "All" ||
      song.playlist === playlist;

    return (
      matchesSearch &&
      matchesGenre &&
      matchesPlaylist
    );
  });

  // =========================
  // PAGINATION
  // =========================

  const startIndex =
    (page - 1) * recordsPerPage;

  const paginatedSongs = filteredSongs.slice(
    startIndex,
    startIndex + recordsPerPage
  );

  const totalPages = Math.ceil(
    filteredSongs.length / recordsPerPage
  );

  // =========================
  // GET UNIQUE VALUES
  // =========================

  const genres = [
    "All",
    ...new Set(
      songs
        .map((song) => song.genre)
        .filter(Boolean)
    ),
  ];

  const playlists = [
    "All",
    ...new Set(
      songs
        .map((song) => song.playlist)
        .filter(Boolean)
    ),
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#f5f3ff,#ffffff)",
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
                fontWeight: "bold",
                color: "#333",
              }}
            >
              My Songs
            </Typography>

            <Typography color="text.secondary">
              Manage your music collection
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<FaPlus />}
            onClick={() =>
              navigate("/add-song")
            }
            sx={{
              backgroundColor: "#7c4dff",
              "&:hover": {
                backgroundColor: "#651fff",
              },
            }}
          >
            Add Song
          </Button>
        </Box>

        {/* SEARCH */}

        <Card
          sx={{
            p: 2,
            mb: 4,
            borderRadius: 3,
          }}
        >
          <Grid
            container
            spacing={2}
            alignItems="center"
          >

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Search song, artist or album"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                InputProps={{
                  startAdornment: (
                    <FaSearch
                      style={{
                        marginRight: 10,
                        color: "#777",
                      }}
                    />
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <TextField
                select
                fullWidth
                label="Genre"
                value={genre}
                onChange={(e) => {
                  setGenre(e.target.value);
                  setPage(1);
                }}
              >
                {genres.map((item) => (
                  <MenuItem
                    key={item}
                    value={item}
                  >
                    {item}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <TextField
                select
                fullWidth
                label="Playlist"
                value={playlist}
                onChange={(e) => {
                  setPlaylist(e.target.value);
                  setPage(1);
                }}
              >
                {playlists.map((item) => (
                  <MenuItem
                    key={item}
                    value={item}
                  >
                    {item}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

          </Grid>
        </Card>

        {/* RESULT COUNT */}

        <Typography
          sx={{
            mb: 2,
            fontWeight: 600,
          }}
        >
          {filteredSongs.length} Songs Found
        </Typography>

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
              sx={{ color: "#7c4dff" }}
            />
          </Box>
        ) : filteredSongs.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              py: 8,
            }}
          >
            <FaMusic
              size={50}
              color="#7c4dff"
            />

            <Typography
              variant="h6"
              sx={{ mt: 2 }}
            >
              No songs found
            </Typography>
          </Box>
        ) : (
          <>
            {/* SONG CARDS */}

            <Grid container spacing={3}>
              {paginatedSongs.map((song) => (
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
                      borderRadius: 3,
                      transition: "0.3s",
                      "&:hover": {
                        transform:
                          "translateY(-5px)",
                        boxShadow:
                          "0 10px 30px rgba(0,0,0,0.12)",
                      },
                    }}
                  >
                    <CardContent>

                      {/* ICON + HEART */}

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent:
                            "space-between",
                          alignItems: "center",
                          mb: 2,
                        }}
                      >
                        <Box
                          sx={{
                            width: 55,
                            height: 55,
                            borderRadius: "50%",
                            display: "flex",
                            justifyContent:
                              "center",
                            alignItems: "center",
                            backgroundColor:
                              "#ede7f6",
                            color: "#7c4dff",
                          }}
                        >
                          <FaMusic size={24} />
                        </Box>

                        <IconButton
                          onClick={() =>
                            handleFavorite(song)
                          }
                          sx={{
                            color: song.isFavorite
                              ? "#e91e63"
                              : "#aaa",
                          }}
                        >
                          {song.isFavorite ? (
                            <FaHeart />
                          ) : (
                            <FaRegHeart />
                          )}
                        </IconButton>
                      </Box>

                      {/* SONG INFO */}

                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          mb: 0.5,
                        }}
                      >
                        {song.title}
                      </Typography>

                      <Typography
                        color="text.secondary"
                        sx={{ mb: 1 }}
                      >
                        {song.artist}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{ mb: 2 }}
                      >
                        Album: {song.album}
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

                        <Chip
                          label={song.releaseYear}
                          size="small"
                          variant="outlined"
                        />
                      </Box>

                      {/* PLAY */}

                      <Button
                        fullWidth
                        variant="contained"
                        startIcon={<FaPlay />}
                        onClick={() =>
                          setSelectedSong(song)
                        }
                        sx={{
                          mb: 2,
                          backgroundColor:
                            "#7c4dff",
                          "&:hover": {
                            backgroundColor:
                              "#651fff",
                          },
                        }}
                      >
                        Play Song
                      </Button>

                      {/* VIEW + EDIT + DELETE */}

                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                        }}
                      >

                        <Button
                          fullWidth
                          variant="outlined"
                          startIcon={<FaEye />}
                          onClick={() =>
                            navigate(
                              `/song-details/${song.id}`
                            )
                          }
                        >
                          View
                        </Button>

                        <Button
                          fullWidth
                          variant="outlined"
                          startIcon={<FaEdit />}
                          onClick={() =>
                            navigate(
                              `/edit-song/${song.id}`
                            )
                          }
                        >
                          Edit
                        </Button>

                        <IconButton
                          onClick={() =>
                            handleDelete(song.id)
                          }
                          sx={{
                            color: "#f44336",
                            border: "1px solid #f44336",
                            borderRadius: 1,
                          }}
                        >
                          <FaTrash />
                        </IconButton>

                      </Box>

                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* PAGINATION */}

            {totalPages > 1 && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 5,
                }}
              >
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(_, value) =>
                    setPage(value)
                  }
                  color="primary"
                />
              </Box>
            )}
          </>
        )}

        {/* MUSIC PLAYER */}

        {selectedSong && (
          <MusicPlayer
             song={selectedSong}
  songs={filteredSongs}
  onSongChange={setSelectedSong}
  onClose={() => setSelectedSong(null)}
          />
        )}

      </Container>
    </Box>
  );
}

export default Songs;