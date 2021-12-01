import { PlayArrowRounded } from '@mui/icons-material';
import React, { useRef } from 'react';
import './PostVideo.css';

export function PostVideo({
  videoURL,
  paused,
  muted,

  className,
  autoPlay,
}) {
  const videoRef = useRef();
  React.useEffect(() => {
    if (paused) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
  }, [paused]);
  return (
    <div>
      {paused && (
        <div className="play-icon-container">
          <PlayArrowRounded
            onClick={() => videoRef.current.pause()}
            className="play-icon"
            fontSize="large"
          />
        </div>
      )}

      <video
        className={className}
        muted={muted}
        autoPlay={autoPlay}
        ref={videoRef}
        src={videoURL}
      />
    </div>
  );
}
