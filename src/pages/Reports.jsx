import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Alert,
} from "@mui/material";

import {
  FaMusic,
  FaHeart,
  FaList,
  FaChartPie,
} from "react-icons/fa";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import { getAllSongs } from "../services/apiServices";



function Report() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ============================
  // FETCH SONGS
  // ============================

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      setLoading(true);

      const response = await getAllSongs();

      setSongs(response.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Unable to load report data.");
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // TOTAL SONGS
  // ============================

  const totalSongs = songs.length;

  // ============================
  // FAVORITE SONGS
  // ============================

  const favoriteSongs = songs.filter(
    (song) => song.isFavorite === true
  ).length;

  // ============================
  // PLAYLISTS
  // ============================

  const playlists = [
    ...new Set(
      songs
        .map((song) => song.playlist)
        .filter((playlist) => playlist)
    ),
  ];

  // ============================
  // GENRES
  // ============================

  const genres = [
    ...new Set(
      songs
        .map((song) => song.genre)
        .filter((genre) => genre)
    ),
  ];

  // ============================
  // GENRE DATA
  // ============================

  const genreData = genres.map((genre) => ({
    name: genre,
    value: songs.filter(
      (song) => song.genre === genre
    ).length,
  }));

  // ============================
  // PLAYLIST DATA
  // ============================

  const playlistData = playlists.map((playlist) => ({
    name: playlist,
    songs: songs.filter(
      (song) => song.playlist === playlist
    ).length,
  }));

  // ============================
  // RELEASE YEAR DATA
  // ============================

  const yearData = [];

  songs.forEach((song) => {
    const year = song.releaseYear;

    if (year) {
      const existingYear = yearData.find(
        (item) => item.year === year
      );

      if (existingYear) {
        existingYear.songs += 1;
      } else {
        yearData.push({
          year: year,
          songs: 1,
        });
      }
    }
  });

  yearData.sort((a, b) => a.year - b.year);

  // ============================
  // CHART COLORS
  // ============================

  const COLORS = [
    "#7c4dff",
    "#ab47bc",
    "#5e35b1",
    "#8e24aa",
    "#3949ab",
    "#6a1b9a",
    "#9575cd",
  ];

  // ============================
  // LOADING
  // ============================

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "80vh",
        py: { xs: 4, md: 7 },
        backgroundColor: "background.default",
      }}
    >
      <Container maxWidth="xl">

        {/* =================================
            PAGE HEADER
        ================================= */}

        <Box
          sx={{
            textAlign: "center",
            mb: { xs: 5, md: 7 },
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              mb: 1.5,
              fontSize: {
                xs: "2rem",
                sm: "2.5rem",
                md: "3.2rem",
              },
            }}
          >
            Music Reports
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              maxWidth: 700,
              mx: "auto",
              fontSize: {
                xs: "0.9rem",
                sm: "1rem",
              },
              lineHeight: 1.7,
            }}
          >
            Analyze your music collection, playlists,
            genres, favorite songs and release years.
          </Typography>
        </Box>

        {/* =================================
            ERROR
        ================================= */}

        {error && (
          <Alert
            severity="error"
            sx={{ mb: 4 }}
          >
            {error}
          </Alert>
        )}

        {/* =================================
            STATISTICS
        ================================= */}

        <Grid
          container
          spacing={3}
          sx={{ mb: { xs: 6, md: 8 } }}
        >

          {/* TOTAL SONGS */}

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: "100%",
                minHeight: 145,
                borderRadius: 4,
                boxShadow: 3,
              }}
            >
              <CardContent
                sx={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 2.5,
                  p: 3,
                }}
              >
                <Box
                  sx={{
                    width: 65,
                    height: 65,
                    flexShrink: 0,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#ede7f6",
                    color: "#7c4dff",
                  }}
                >
                  <FaMusic size={27} />
                </Box>

                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 0.5 }}
                  >
                    Total Songs
                  </Typography>

                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    {totalSongs}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* FAVORITES */}

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: "100%",
                minHeight: 145,
                borderRadius: 4,
                boxShadow: 3,
              }}
            >
              <CardContent
                sx={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 2.5,
                  p: 3,
                }}
              >
                <Box
                  sx={{
                    width: 65,
                    height: 65,
                    flexShrink: 0,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#fce4ec",
                    color: "#e91e63",
                  }}
                >
                  <FaHeart size={25} />
                </Box>

                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 0.5 }}
                  >
                    Favorites
                  </Typography>

                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    {favoriteSongs}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* PLAYLISTS */}

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: "100%",
                minHeight: 145,
                borderRadius: 4,
                boxShadow: 3,
              }}
            >
              <CardContent
                sx={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 2.5,
                  p: 3,
                }}
              >
                <Box
                  sx={{
                    width: 65,
                    height: 65,
                    flexShrink: 0,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#e8eaf6",
                    color: "#3949ab",
                  }}
                >
                  <FaList size={25} />
                </Box>

                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 0.5 }}
                  >
                    Playlists
                  </Typography>

                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    {playlists.length}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* GENRES */}

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: "100%",
                minHeight: 145,
                borderRadius: 4,
                boxShadow: 3,
              }}
            >
              <CardContent
                sx={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 2.5,
                  p: 3,
                }}
              >
                <Box
                  sx={{
                    width: 65,
                    height: 65,
                    flexShrink: 0,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#f3e5f5",
                    color: "#8e24aa",
                  }}
                >
                  <FaChartPie size={25} />
                </Box>

                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 0.5 }}
                  >
                    Genres
                  </Typography>

                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    {genres.length}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* =================================
            CHART SECTION
        ================================= */}

        <Grid
          container
          spacing={{ xs: 4, md: 5 }}
        >

          {/* =================================
              GENRE PIE CHART
          ================================= */}

          <Grid item xs={12} md={6}>
            <Card
              sx={{
                width: "100%",
                minHeight: 520,
                borderRadius: 4,
                boxShadow: 4,
              }}
            >
              <CardContent
                sx={{
                  p: { xs: 3, sm: 4 },
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    mb: 1,
                  }}
                >
                  Songs by Genre
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  Distribution of your songs according
                  to different music genres.
                </Typography>

                {genreData.length === 0 ? (
                  <Box
                    sx={{
                      height: 380,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography color="text.secondary">
                      No genre data available.
                    </Typography>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      width: "100%",
                      height: 400,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <ResponsiveContainer
                      width="100%"
                      height="100%"
                    >
                      <PieChart>
                        <Pie
                          data={genreData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="45%"
                          outerRadius={135}
                          innerRadius={55}
                          paddingAngle={3}
                          label
                        >
                          {genreData.map(
                            (entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={
                                  COLORS[
                                    index %
                                      COLORS.length
                                  ]
                                }
                              />
                            )
                          )}
                        </Pie>

                        <Tooltip />

                        <Legend
                          verticalAlign="bottom"
                          height={45}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* =================================
              PLAYLIST BAR CHART
          ================================= */}

          <Grid item xs={12} md={6}>
            <Card
              sx={{
                width: "100%",
                minHeight: 520,
                borderRadius: 4,
                boxShadow: 4,
              }}
            >
              <CardContent
                sx={{
                  p: { xs: 3, sm: 4 },
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    mb: 1,
                  }}
                >
                  Songs by Playlist
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  Number of songs available in each
                  playlist.
                </Typography>

                {playlistData.length === 0 ? (
                  <Box
                    sx={{
                      height: 380,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography color="text.secondary">
                      No playlist data available.
                    </Typography>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      width: "100%",
                      height: 400,
                    }}
                  >
                    <ResponsiveContainer
                      width="100%"
                      height="100%"
                    >
                      <BarChart
                        data={playlistData}
                        margin={{
                          top: 20,
                          right: 20,
                          left: 5,
                          bottom: 20,
                        }}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                        />

                        <XAxis
                          dataKey="name"
                          tick={{ fontSize: 13 }}
                        />

                        <YAxis
                          allowDecimals={false}
                        />

                        <Tooltip />

                        <Bar
                          dataKey="songs"
                          fill="#7c4dff"
                          radius={[
                            8,
                            8,
                            0,
                            0,
                          ]}
                          barSize={55}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* =================================
              RELEASE YEAR CHART
          ================================= */}

          <Grid item xs={12}>
            <Card
              sx={{
                width: "100%",
                minHeight: 520,
                borderRadius: 4,
                boxShadow: 4,
              }}
            >
              <CardContent
                sx={{
                  p: { xs: 3, sm: 4 },
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    mb: 1,
                  }}
                >
                  Songs by Release Year
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  Number of songs released in each year.
                </Typography>

                {yearData.length === 0 ? (
                  <Box
                    sx={{
                      height: 380,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography color="text.secondary">
                      No release year data available.
                    </Typography>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      width: "100%",
                      height: 400,
                    }}
                  >
                    <ResponsiveContainer
                      width="100%"
                      height="100%"
                    >
                      <BarChart
                        data={yearData}
                        margin={{
                          top: 20,
                          right: 25,
                          left: 10,
                          bottom: 20,
                        }}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                        />

                        <XAxis
                          dataKey="year"
                          tick={{ fontSize: 13 }}
                        />

                        <YAxis
                          allowDecimals={false}
                        />

                        <Tooltip />

                        <Bar
                          dataKey="songs"
                          fill="#6a1b9a"
                          radius={[
                            8,
                            8,
                            0,
                            0,
                          ]}
                          barSize={60}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

      </Container>
    </Box>
  );
}

export default Report;