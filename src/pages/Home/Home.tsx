import React, { FC, useState } from "react";
import VideoItem from "../../components/VideoItem";
import Controls from "../../components/Controls";
import { VIDEO_URL_LIST } from "../../constants";
import Button from "@mui/material/Button";
import "./Home.scss";

export const Home: FC = () => {
  const [showPlayer, setShowPlayer] = useState(false);

  return (
    <div className="wrapper">
      {showPlayer ? (
        <>
          <div className="video_wrapper">
            {VIDEO_URL_LIST.map((url) => (
              <VideoItem url={url} key={url} />
            ))}
          </div>

          <Controls />
        </>
      ) : (
        <div className="show_video_button">
          <Button onClick={() => setShowPlayer(true)} variant="contained">
            Show videos
          </Button>
        </div>
      )}
    </div>
  );
};
