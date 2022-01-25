import React from 'react';
import styles from './StoryImage.module.css';
import Image from 'next/image';

export function StoryImage({ onProgress, paused, alt, dimensions, ...props }) {
  const [progress, setCurrentProgress] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    if (onProgress && progress < 1 && !paused && !isLoading) {
      setTimeout(() => setCurrentProgress(progress + 0.01), 150);
      onProgress(progress);
    } else if (onProgress && progress >= 1) {
      onProgress(1);
    }
  }, [progress, onProgress, paused, isLoading]);

  return (
    <Image
      onLoad={() => setIsLoading(false)}
      className={styles.storyImg}
      alt={alt}
      {...props}
      width={dimensions.width}
      height={dimensions.height}
    />
  );
}
