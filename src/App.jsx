import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Songs from "./pages/Songs";
import AddSong from "./pages/AddSong";
import EditSong from "./pages/EditSong";
import SongDetails from "./pages/SongDetails";
import Favorites from "./pages/Favorites";
import Playlists from "./pages/Playlists";
import Calendar from "./pages/Calendar";
import Reports from "./pages/Reports";


function App() {

   const [darkMode, setDarkMode] = useState(
    sessionStorage.getItem("theme") === "dark"
  );

  return (
    <Routes>

      {/* ========================= */}
      {/* AUTH PAGES - NO HEADER */}
      {/* ========================= */}

      <Route
        path="/"
        element={<Register />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/login"
        element={<Login />}
      />


      {/* ========================= */}
      {/* MAIN APPLICATION */}
      {/* ========================= */}

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <>
              <Header darkMode={darkMode}
        setDarkMode={setDarkMode} />
              <Home />
              <Footer />
            </>
          </ProtectedRoute>
        }
      />

    

      <Route
        path="/songs"
        element={
          <ProtectedRoute>
            <>
              <Header darkMode={darkMode}
        setDarkMode={setDarkMode}/>
              <Songs />
              <Footer />
            </>
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-song"
        element={
          <ProtectedRoute>
            <>
              <Header darkMode={darkMode}
        setDarkMode={setDarkMode}/>
              <AddSong />
              <Footer />
            </>
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit-song/:id"
        element={
          <ProtectedRoute>
            <>
              <Header darkMode={darkMode}
        setDarkMode={setDarkMode} />
              <EditSong />
              <Footer />
            </>
          </ProtectedRoute>
        }
      />

      <Route
        path="/song-details/:id"
        element={
          <ProtectedRoute>
            <>
              <Header darkMode={darkMode}
        setDarkMode={setDarkMode} />
              <SongDetails />
              <Footer />
            </>
          </ProtectedRoute>
        }
      />

      <Route
        path="/favorites"
        element={
          <ProtectedRoute>
            <>
              <Header darkMode={darkMode}
        setDarkMode={setDarkMode} />
              <Favorites />
              <Footer />
            </>
          </ProtectedRoute>
        }
      />

      <Route
        path="/playlists"
        element={
          <ProtectedRoute>
            <>
              <Header darkMode={darkMode}
        setDarkMode={setDarkMode} />
              <Playlists />
              <Footer />
            </>
          </ProtectedRoute>
        }
      />

      <Route
        path="/calendar"
        element={
          <ProtectedRoute>
            <>
              <Header darkMode={darkMode}
        setDarkMode={setDarkMode} />
              <Calendar />
              <Footer />
            </>
          </ProtectedRoute>
        }
      />

      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <>
              <Header darkMode={darkMode}
        setDarkMode={setDarkMode} />
              <Reports />
              <Footer />
            </>
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;



