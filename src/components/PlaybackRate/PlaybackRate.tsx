import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { PLAYBACK_RATE_LIST } from "constants/index";
import { playerProvider } from "providers/player-provider";

export default function PlaybackRate() {
  const [playbackRate, setPlaybackRate] = useState(1);

  const handlePlaybackRateChange = (e: SelectChangeEvent<number>) => {
    const value = Number(e.target.value) || 1;
    playerProvider.setPlaybackRate(value);

    setPlaybackRate(value);
  };

  return (
    <FormControl>
      <InputLabel id="playback-rate-label">Speed</InputLabel>
      <Select
        onChange={handlePlaybackRateChange}
        labelId="playback-rate-label"
        id="playback-rate-select"
        value={playbackRate}
        label="Speed"
      >
        {PLAYBACK_RATE_LIST.map((rate) => (
          <MenuItem value={rate} key={rate}>
            {rate}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
