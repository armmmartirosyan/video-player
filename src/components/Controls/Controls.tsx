import React from "react";
import SliderControl from "../SliderControl";
import PlaybackRate from "../PlaybackRate";
import StartStop from "../StartStop";
import Volume from "../Volume";
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
