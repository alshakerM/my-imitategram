import React from 'react';
import styles from './StoryImage.module.css';

export function StoryImage({ onProgress, paused, alt, ...props }) {
  const [progress, setCurrentProgress] = React.useState(0);

  React.useEffect(() => {
    if (onProgress && progress < 1 && !paused) {
      setTimeout(() => setCurrentProgress(progress + 0.01), 150);
      onProgress(progress);
    } else if (onProgress && progress >= 1) {
      onProgress(1);
    }
  }, [progress, onProgress, paused]);

  return <img className={styles.storyImg} alt={alt} {...props} />;
}
