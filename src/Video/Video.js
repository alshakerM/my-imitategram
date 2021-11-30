import React, { useRef } from "react";
import "./Video.css";

export function Video({ videoURL, paused, muted, onProgress, className, autoPlay}) {
  const videoRef = useRef();
  React.useEffect(() => {
    if (paused) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
  }, [paused]);
  return (
    <video
      className={className}
      muted={muted}
      autoPlay={autoPlay}
      ref={videoRef}
      src={videoURL}
      onTimeUpdate={(event) =>
        onProgress?.(event.target.currentTime / event.target.duration)
      }
    />
  );
}
