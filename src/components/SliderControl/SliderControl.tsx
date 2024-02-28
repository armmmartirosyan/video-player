import Slider from "@mui/material/Slider";
import React, { useEffect, useRef, useState } from "react";
import { playerProvider } from "../../providers/player-provider";
import { PLAYER_STATES, Player_Event_Types } from "../../constants";

export default function SliderControl() {
  const [sliderValue, setSliderValue] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    const stateChangeOff = playerProvider.eventEmitter.on(
      Player_Event_Types.STATE_CHANGE,
      onStateChange
    );

    const playbackRateChangeOff = playerProvider.eventEmitter.on(
      Player_Event_Types.SET_PLAYBACK_RATE,
      onChangePlaybackRate
    );

    const timeUpdateOff = playerProvider.eventEmitter.on(
      Player_Event_Types.TIME_UPDATE,
      onTimeUpdate
    );

    return () => {
      stateChangeOff();
      playbackRateChangeOff();
      timeUpdateOff();
    };
  }, []);

  const onStateChange = (state: PLAYER_STATES) => {
    switch (state) {
      case PLAYER_STATES.PLAYING: {
        startInterval(playerProvider.speed);
        break;
      }
      case PLAYER_STATES.PAUSED: {
        clearInterval(intervalRef.current);
        break;
      }
    }
  };

  const handleJump = (_: Event, value: number | number[]) => {
    const newValue = Array.isArray(value) ? value[0] : value;

    playerProvider.jump(newValue);

    setSliderValue(newValue);
  };

  const onChangePlaybackRate = (speed: number) => {
    const isPlaying = playerProvider.state === PLAYER_STATES.PLAYING;

    if (isPlaying) {
      clearInterval(intervalRef.current);

      startInterval(speed);
    }
  };

  const onTimeUpdate = (time: number) => {
    setSliderValue(time);
  };

  const startInterval = (speed: number) => {
    intervalRef.current = setInterval(() => {
      setSliderValue((prev) => prev + 1);
    }, 1000 / speed);
  };

  return (
    <Slider
      size="small"
      min={0}
      max={playerProvider.theShortestVideoLength}
      value={sliderValue}
      onChange={handleJump}
    />
  );
}
