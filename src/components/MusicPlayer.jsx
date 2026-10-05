import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Slider,
  IconButton,
} from "@mui/material";

import {
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaTimes,
} from "react-icons/fa";

function MusicPlayer({
  song,
  songs = [],
  onSongChange,
  onClose,
}) {
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!audioRef.current || !song) return;

    audioRef.current.pause();
    audioRef.current.load();

    setCurrentTime(0);
    setIsPlaying(false);
  }, [song]);

  const playSong = async () => {
    if (!song?.audioUrl) {
      alert("Audio file is not available.");
      return;
    }

    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Audio play error:", error);
      alert("Unable to play this audio file.");
    }
  };

  const pauseSong = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseSong();
    } else {
      playSong();
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleSeek = (_, value) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setCurrentTime(value);
    }
  };

  const playPrevious = () => {
    if (!song || songs.length === 0) return;

    const index = songs.findIndex(
      (item) => item.id === song.id
    );

    const previousIndex =
      index <= 0 ? songs.length - 1 : index - 1;

    onSongChange(songs[previousIndex]);
  };

  const playNext = () => {
    if (!song || songs.length === 0) return;

    const index = songs.findIndex(
      (item) => item.id === song.id
    );

    const nextIndex =
      index === songs.length - 1 ? 0 : index + 1;

    onSongChange(songs[nextIndex]);
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  if (!song) {
    return null;
  }

  return (
    <Box
      sx={{
        position: "sticky",
        bottom: 20,
        zIndex: 1000,
        maxWidth: 750,
        mx: "auto",
        mt: 4,
        p: 3,
        pt: 2.5,
        borderRadius: 3,
        background:
          "linear-gradient(135deg, #6a1b9a, #7c4dff)",
        color: "white",
        boxShadow:
          "0 8px 30px rgba(0,0,0,0.25)",
      }}
    >

      {/* CLOSE BUTTON */}
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 8,
          right: 10,
          color: "white",
          backgroundColor: "rgba(255,255,255,0.15)",

          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.3)",
          },
        }}
      >
        <FaTimes size={16} />
      </IconButton>

      {/* HIDDEN AUDIO ELEMENT */}
      <audio
        ref={audioRef}
        src={song.audioUrl}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onEnded={playNext}
      />

      {/* SONG TITLE */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          pr: 4,
        }}
      >
        {song.title}
      </Typography>

      {/* ARTIST */}
      <Typography
        variant="body2"
        sx={{
          textAlign: "center",
          opacity: 0.8,
          mb: 2,
        }}
      >
        {song.artist}
      </Typography>

      {/* PROGRESS */}
      <Slider
        value={currentTime}
        max={duration || 1}
        onChange={handleSeek}
        sx={{
          color: "white",
          mt: 1,
        }}
      />

      {/* TIME */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 12,
        }}
      >
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </Box>

      {/* CONTROLS */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 3,
          mt: 2,
        }}
      >

        {/* PREVIOUS */}
        <Button
          onClick={playPrevious}
          sx={{
            color: "white",
            minWidth: 40,
          }}
        >
          <FaStepBackward />
        </Button>

        {/* PLAY / PAUSE */}
        <Button
          onClick={togglePlay}
          sx={{
            color: "#7c4dff",
            backgroundColor: "white",
            minWidth: 55,
            width: 55,
            height: 55,
            borderRadius: "50%",

            "&:hover": {
              backgroundColor: "#f5f5f5",
            },
          }}
        >
          {isPlaying ? (
            <FaPause />
          ) : (
            <FaPlay />
          )}
        </Button>

        {/* NEXT */}
        <Button
          onClick={playNext}
          sx={{
            color: "white",
            minWidth: 40,
          }}
        >
          <FaStepForward />
        </Button>

      </Box>
    </Box>
  );
}

export default MusicPlayer;