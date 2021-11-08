import React from "react";
import "./StoryImage.css"

export function StoryImage({ onProgress, paused, ...props }) {
  const [progress, setCurrentProgress] = React.useState(0);

  React.useEffect(() => {
    if (progress < 1 && !paused) {
      setTimeout(() => setCurrentProgress(progress + 0.01), 150);
      onProgress(progress);
    } else if (progress >= 1){
      onProgress(1);
    }
  }, [progress, paused]);

  return <img className="story-img" {...props} />;
}
