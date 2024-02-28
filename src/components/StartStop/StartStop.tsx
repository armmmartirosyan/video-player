import React, { useEffect, useState } from "react";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import { playerProvider } from "../../providers/player-provider";
import { PLAYER_STATES, Player_Event_Types } from "../../constants";

export default function StartStop() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const stateChangeOff = playerProvider.eventEmitter.on(
      Player_Event_Types.STATE_CHANGE,
      onStateChange
    );

    return () => {
      stateChangeOff();
    };
  }, []);

  const onStateChange = (state: number) => {
    switch (state) {
      case PLAYER_STATES.PLAYING: {
        setIsPlaying(true);
        break;
      }
      case PLAYER_STATES.PAUSED: {
        setIsPlaying(false);
        break;
      }
    }
  };

  const handleStateToggle = () => {
    isPlaying ? playerProvider.pause() : playerProvider.play();
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      {isPlaying ? (
        <StopCircleIcon onClick={handleStateToggle} fontSize="large" />
      ) : (
        <PlayCircleIcon onClick={handleStateToggle} fontSize="large" />
      )}
    </>
  );
}
