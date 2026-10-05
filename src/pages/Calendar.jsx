import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  CircularProgress,
  Chip,
} from "@mui/material";

import {
  FaCalendarAlt,
  FaMusic,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";


import Swal from "sweetalert2";
import { getAllSongs } from "../services/apiServices";

function Calendar() {
  const [songs, setSongs] = useState([]);
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear()
  );
  const [loading, setLoading] = useState(true);

  // Fetch songs
  const fetchSongs = async () => {
    try {
      setLoading(true);

      const response = await getAllSongs();

      setSongs(response.data);
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Unable to load songs.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  // Get years from songs
  const years = [...new Set(
    songs
      .map((song) => Number(song.releaseYear))
      .filter((year) => !isNaN(year))
  )].sort((a, b) => a - b);

  // Songs for selected year
  const selectedSongs = songs.filter(
    (song) => Number(song.releaseYear) === selectedYear
  );

  // Previous year
  const previousYear = () => {
    setSelectedYear((prev) => prev - 1);
  };

  // Next year
  const nextYear = () => {
    setSelectedYear((prev) => prev + 1);
  };

  // Select year from available years
  const selectYear = (year) => {
    setSelectedYear(year);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #f5f3ff 0%, #ffffff 50%, #f3efff 100%)",
        py: { xs: 4, md: 6 },
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
              margin: "0 auto 15px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #7c4dff, #512da8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              boxShadow: "0 8px 25px rgba(124,77,255,0.25)",
            }}
          >
            <FaCalendarAlt size={30} />
          </Box>

          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "#222",
              mb: 1,
            }}
          >
            Release Calendar
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "#777",
              maxWidth: 600,
              mx: "auto",
            }}
          >
            Explore your songs based on their release year.
          </Typography>
        </Box>

        {/* YEAR NAVIGATION */}
        <Card
          sx={{
            maxWidth: 700,
            mx: "auto",
            mb: 4,
            borderRadius: 4,
            boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
          }}
        >
          <CardContent sx={{ p: { xs: 2, md: 3 } }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: { xs: 2, md: 4 },
              }}
            >
              <Button
                onClick={previousYear}
                variant="outlined"
                sx={{
                  minWidth: 45,
                  width: 45,
                  height: 45,
                  borderRadius: "50%",
                  borderColor: "#7c4dff",
                  color: "#7c4dff",
                }}
              >
                <FaChevronLeft />
              </Button>

              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#888",
                    mb: 0.5,
                  }}
                >
                  SELECTED YEAR
                </Typography>

                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: "bold",
                    color: "#7c4dff",
                    fontSize: { xs: "2rem", md: "3rem" },
                  }}
                >
                  {selectedYear}
                </Typography>
              </Box>

              <Button
                onClick={nextYear}
                variant="outlined"
                sx={{
                  minWidth: 45,
                  width: 45,
                  height: 45,
                  borderRadius: "50%",
                  borderColor: "#7c4dff",
                  color: "#7c4dff",
                }}
              >
                <FaChevronRight />
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* AVAILABLE YEARS */}
        {years.length > 0 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 1,
              mb: 5,
            }}
          >
            {years.map((year) => (
              <Button
                key={year}
                onClick={() => selectYear(year)}
                variant={
                  selectedYear === year ? "contained" : "outlined"
                }
                sx={{
                  minWidth: 80,
                  borderRadius: 5,
                  borderColor: "#7c4dff",
                  color:
                    selectedYear === year ? "#fff" : "#7c4dff",
                  backgroundColor:
                    selectedYear === year ? "#7c4dff" : "transparent",
                  "&:hover": {
                    backgroundColor:
                      selectedYear === year
                        ? "#6a3de8"
                        : "#f1edff",
                  },
                }}
              >
                {year}
              </Button>
            ))}
          </Box>
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
            <CircularProgress sx={{ color: "#7c4dff" }} />
          </Box>
        ) : (
          <>
            {/* RESULT TITLE */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 2,
                mb: 3,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  color: "#222",
                }}
              >
                Songs Released in {selectedYear}
              </Typography>

              <Chip
                icon={<FaMusic />}
                label={`${selectedSongs.length} ${
                  selectedSongs.length === 1 ? "Song" : "Songs"
                }`}
                sx={{
                  backgroundColor: "#ede7f6",
                  color: "#6a1b9a",
                  fontWeight: "bold",
                }}
              />
            </Box>

            {/* SONGS */}
            {selectedSongs.length === 0 ? (
              <Card
                sx={{
                  borderRadius: 4,
                  textAlign: "center",
                  py: 7,
                  px: 2,
                  boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
                }}
              >
                <FaMusic
                  size={50}
                  color="#bdbdbd"
                  style={{ marginBottom: 15 }}
                />

                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: "#555",
                    mb: 1,
                  }}
                >
                  No Songs Found
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: "#888",
                  }}
                >
                  There are no songs released in {selectedYear}.
                </Typography>
              </Card>
            ) : (
              <Grid container spacing={3}>
                {selectedSongs.map((song) => (
                  <Grid item xs={12} sm={6} md={4} key={song.id}>
                    <Card
                      sx={{
                        height: "100%",
                        borderRadius: 4,
                        boxShadow:
                          "0 8px 25px rgba(0,0,0,0.07)",
                        transition: "0.3s",
                        "&:hover": {
                          transform: "translateY(-5px)",
                          boxShadow:
                            "0 12px 30px rgba(124,77,255,0.18)",
                        },
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        {/* MUSIC ICON */}
                        <Box
                          sx={{
                            width: 55,
                            height: 55,
                            borderRadius: 3,
                            background:
                              "linear-gradient(135deg, #7c4dff, #512da8)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                            mb: 2,
                          }}
                        >
                          <FaMusic size={23} />
                        </Box>

                        {/* SONG TITLE */}
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: "bold",
                            color: "#222",
                            mb: 0.5,
                          }}
                        >
                          {song.title}
                        </Typography>

                        {/* ARTIST */}
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#777",
                            mb: 2,
                          }}
                        >
                          {song.artist}
                        </Typography>

                        {/* DETAILS */}
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              gap: 2,
                            }}
                          >
                            <Typography variant="body2" color="text.secondary">
                              Album
                            </Typography>

                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: 600,
                                textAlign: "right",
                              }}
                            >
                              {song.album}
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              gap: 2,
                            }}
                          >
                            <Typography variant="body2" color="text.secondary">
                              Genre
                            </Typography>

                            <Chip
                              label={song.genre}
                              size="small"
                              sx={{
                                backgroundColor: "#f3e5f5",
                                color: "#7b1fa2",
                              }}
                            />
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              gap: 2,
                            }}
                          >
                            <Typography variant="body2" color="text.secondary">
                              Duration
                            </Typography>

                            <Typography
                              variant="body2"
                              sx={{ fontWeight: 600 }}
                            >
                              {song.duration}
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              gap: 2,
                            }}
                          >
                            <Typography variant="body2" color="text.secondary">
                              Playlist
                            </Typography>

                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: 600,
                                color: "#7c4dff",
                              }}
                            >
                              {song.playlist}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </>
        )}
      </Container>
    </Box>
  );
}

export default Calendar;