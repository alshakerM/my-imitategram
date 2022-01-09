import React from 'react';
import styles from './StoryImage.module.css';
import Image from 'next/image';

export function StoryImage({ onProgress, paused, alt, dimensions, ...props }) {
  const [progress, setCurrentProgress] = React.useState(0);

  React.useEffect(() => {
    if (onProgress && progress < 1 && !paused) {
      setTimeout(() => setCurrentProgress(progress + 0.01), 150);
      onProgress(progress);
    } else if (onProgress && progress >= 1) {
      onProgress(1);
    }
  }, [progress, onProgress, paused]);

  return (
    <Image
      className={styles.storyImg}
      alt={alt}
      {...props}
      width={dimensions.width}
      height={dimensions.height}
    />
  );
}
