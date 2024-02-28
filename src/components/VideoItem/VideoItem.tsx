import React, { FC, useEffect } from "react";
import { playerProvider } from "providers/player-provider";
import { Player_Event_Types, PLAYER_STATES } from "constants/index";
import { VideoItemProps } from "types";
import "./VideoItem.scss";

const VideoItem: FC<VideoItemProps> = ({ url }) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const stateChangeOff = playerProvider.eventEmitter.on(
      Player_Event_Types.STATE_CHANGE,
      onStateChange
    );
    const timeUpdateOff = playerProvider.eventEmitter.on(
      Player_Event_Types.TIME_UPDATE,
      onTimeUpdate
    );
    const playbackRateChangeOff = playerProvider.eventEmitter.on(
      Player_Event_Types.SET_PLAYBACK_RATE,
      onChangePlaybackRate
    );
    const volumeChangeOff = playerProvider.eventEmitter.on(
      Player_Event_Types.SET_VOLUME,
      onChangeVolume
    );
    const toggleMuteOff = playerProvider.eventEmitter.on(
      Player_Event_Types.TOGGLE_MUTE,
      onToggleMute
    );

    return () => {
      toggleMuteOff();
      volumeChangeOff();
      playbackRateChangeOff();
      stateChangeOff();
      timeUpdateOff();
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      video.addEventListener("canplay", onCanPlay);
      video.addEventListener("waiting", onWaiting);
      video.addEventListener("ended", onEnded);
    }

    return () => {
      video?.removeEventListener("canplay", onCanPlay);
      video?.removeEventListener("waiting", onWaiting);
      video?.removeEventListener("ended", onEnded);
    };
  }, [videoRef.current]);

  const onStateChange = (state: number) => {
    switch (state) {
      case PLAYER_STATES.PLAYING: {
        videoRef.current?.play();
        break;
      }
      case PLAYER_STATES.PAUSED: {
        videoRef.current?.pause();
        break;
      }
    }
  };

  const onTimeUpdate = (time: number) => {
    videoRef.current && (videoRef.current.currentTime = time);
  };

  const onChangePlaybackRate = (speed: number) => {
    videoRef.current && (videoRef.current.playbackRate = speed);
  };

  const onChangeVolume = (volume: number) => {
    videoRef.current && (videoRef.current.volume = volume);
  };

  const onToggleMute = (mute: boolean) => {
    videoRef.current && (videoRef.current.muted = mute);
  };

  const onCanPlay = () => {
    const duration = videoRef.current?.duration;

    if (duration) {
      playerProvider.theShortestVideoLength = duration;
    }

    playerProvider.removeBufferingItem(url);
  };

  const onWaiting = () => {
    playerProvider.addBufferingItem(url);
  };

  const onEnded = () => {
    playerProvider.videoEnded();
  };

  return <video ref={videoRef} src={url} className="video_item" />;
};

export default VideoItem;
