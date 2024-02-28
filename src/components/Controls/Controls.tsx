import React from "react";
import PlaybackRate from "../PlaybackRate";
import Volume from "../Volume";
import StartStop from "../StartStop";
import SliderControl from "../SliderControl";
import "./Controls.scss";

export default function Controls() {
  return (
    <div className="constrols">
      <SliderControl />

      <div className="controls_body">
        <StartStop />
        <Volume />
        <PlaybackRate />
      </div>
    </div>
  );
}
