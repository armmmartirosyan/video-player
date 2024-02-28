import React, { useState } from "react";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import Slider from "@mui/material/Slider";
import { playerProvider } from "providers/player-provider";

export default function Volume() {
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const handleChangeVolume = (event: Event, newValue: number | number[]) => {
    const newVolume = newValue ? (newValue as number) / 100 : 0;
    playerProvider.setVolume(newVolume);
    setVolume(newVolume);

    if (newVolume > 0 && isMuted) {
      playerProvider.toggleMute(false);
      setIsMuted(false);
    } else if (newValue === 0 && !isMuted) {
      playerProvider.toggleMute(true);
      setIsMuted(true);
    }
  };

  const handleToggleMute = () => {
    playerProvider.toggleMute(!isMuted);
    setIsMuted(!isMuted);

    if (volume === 0) {
      playerProvider.setVolume(0.1);
      setVolume(0.1);
    }
  };

  return (
    <div className="volume_control">
      {isMuted ? (
        <VolumeOffIcon onClick={handleToggleMute} />
      ) : (
        <VolumeUpIcon onClick={handleToggleMute} />
      )}

      <div className="volume_slider_container">
        <Slider
          onChange={handleChangeVolume}
          aria-label="Volume"
          value={volume * 100}
          max={100}
          min={0}
        />
      </div>
    </div>
  );
}
