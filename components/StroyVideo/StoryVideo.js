import React, { useRef } from 'react';
import styles from './StoryVideo.module.css';

export function StoryVideo({ videoURL, paused, muted, onProgress }) {
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
      className={styles.storyVideo}
      muted={muted}
      autoPlay
      ref={videoRef}
      src={videoURL}
      onTimeUpdate={(event) =>
        onProgress?.(event.target.currentTime / event.target.duration)
      }
    />
  );
}
