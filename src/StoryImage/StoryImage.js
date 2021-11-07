import React from "react";

export function StoryImage({ onProgress, paused, ...props }) {
  const [progress, setCurrentProgress] = React.useState(0);

  React.useEffect(() => {
    if (progress < 1 && !paused) {
      setTimeout(() => setCurrentProgress(progress + 0.01), 150);
      onProgress(progress);
    } else {
      onProgress(1);
    }
  }, [progress]);

  return <img {...props} />;
}
