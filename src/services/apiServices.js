import axiosInstance from "../api/axiosInstance";


/* =========================
   SONG API
========================= */

export const getAllSongs = () =>
  axiosInstance.get("/songs");

export const getSongById = (id) =>
  axiosInstance.get(`/songs/${id}`);

export const addSong = (songData) =>
  axiosInstance.post("/songs", songData);

export const updateSong = (id, songData) =>
  axiosInstance.put(`/songs/${id}`, songData);

export const deleteSong = (id) =>
  axiosInstance.delete(`/songs/${id}`);

/* =========================
   SEARCH
========================= */

export const searchSongsByTitle = (title) =>
  axiosInstance.get(
    `/songs?title_like=${title}`
  );

export const searchSongsByArtist = (artist) =>
  axiosInstance.get(
    `/songs?artist_like=${artist}`
  );

/* =========================
   FILTER
========================= */

export const getSongsByGenre = (genre) =>
  axiosInstance.get(
    `/songs?genre=${genre}`
  );

export const getSongsByPlaylist = (playlist) =>
  axiosInstance.get(
    `/songs?playlist=${playlist}`
  );

/* =========================
   PLAYLIST
========================= */

export const getPlaylistSongs = (playlist) =>
  axiosInstance.get(
    `/songs?playlist=${playlist}`
  );

/* =========================
   REPORTS
========================= */

export const getGenreData = () =>
  axiosInstance.get("/songs");

export const getPlaylistData = () =>
  axiosInstance.get("/songs");

/* =========================
   CALENDAR
========================= */

export const getSongsByYear = (year) =>
  axiosInstance.get(
    `/songs?releaseYear=${year}`
  );

/* =========================
   USER API
========================= */

export const getAllUsers = () =>
  axiosInstance.get("/users");

export const getUserById = (id) =>
  axiosInstance.get(`/users/${id}`);

export const registerUser = (userData) =>
  axiosInstance.post("/users", userData);

export const updateUser = (id, userData) =>
  axiosInstance.put(
    `/users/${id}`,
    userData
  );

export const deleteUser = (id) =>
  axiosInstance.delete(`/users/${id}`);

/* =========================
   LOGIN
========================= */

export const loginUser = (email) =>
  axiosInstance.get(
    `/users?email=${email}`
  );

/* =========================
   DASHBOARD
========================= */

export const getDashboardSongs = () =>
  axiosInstance.get("/songs");

export const getDashboardUsers = () =>
  axiosInstance.get("/users");
