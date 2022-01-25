import { PlayArrowRounded } from '@mui/icons-material';
import React, { useRef } from 'react';
import styles from './PostVideo.module.css';
import cx from 'classnames';

export function PostVideo({
  videoURL,
  active,
  aspectRatio,
  isLoading,
  setIsLoading,
}) {
  const [videoPause, setVideoPause] = React.useState(true);
  const videoRef = useRef();
  React.useEffect(() => {
    if (videoPause) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
  }, [videoPause]);

  React.useEffect(() => {
    if (!active) {
      setVideoPause(true);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
      }
    }
  }, [active]);

  return (
    <div
      onClick={() => setVideoPause(!videoPause)}
      className={cx(styles.videoContainer, {
        [styles.isLoading]: isLoading,
      })}
      style={{ aspectRatio }}
    >
      <video
        className={styles.postVideo}
        ref={videoRef}
        src={videoURL}
        style={{ aspectRatio }}
        onLoad={() => setIsLoading?.(false)}
      />
      {videoPause && !isLoading && (
        <div className={styles.playIconContainer}>
          <PlayArrowRounded
            onClick={() => setVideoPause(false)}
            className={styles.playIcon}
            fontSize="large"
          />
        </div>
      )}
    </div>
  );
}
