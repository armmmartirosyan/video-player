export const Player_Event_Types = {
  STATE_CHANGE: "STATE_CHANGE",
  TIME_UPDATE: "TIME_UPDATE",
  SET_PLAYBACK_RATE: "SET_PLAYBACK_RATE",
  SET_VOLUME: "SET_VOLUME",
  TOGGLE_MUTE: "TOGGLE_MUTE",
  VIDEO_ENDED: "VIDEO_ENDED",
};

export enum PLAYER_STATES {
  PLAYING,
  PAUSED,
}

export const VIDEO_URL_LIST = [
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
];

export const PLAYBACK_RATE_LIST = [0.5, 0.75, 1, 1.25, 1.5, 2];
