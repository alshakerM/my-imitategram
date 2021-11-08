import storiesData from "../Data/IG-Stories.json";
import "./Stories.css";
import React, { useEffect, useState } from "react";
import { StoryAvatar } from "../StoryAvatar/StoryAvatar";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import classnames from "classnames";

function width(el) {
  return el?.getBoundingClientRect().width;
}


export function Stories() {
  const allCirclesDiv = React.useRef();
  const allCirclesWidth = width(allCirclesDiv.current);
  const [containerWidth, setContainerWidth] = useState(0);
  const [scrollLeft, setScrollLeft] = React.useState(0);
  const scrollLimit = -1 * (allCirclesWidth - containerWidth);
  return (
    <div className="stories-container">
      <div
        ref={(ref) => setContainerWidth(width(ref))}
        className="stories-overflow"
      >
        <div
          style={{ transform: `translateX(${scrollLeft}px)` }}
          ref={allCirclesDiv}
          className="all-circles"
        >
          {storiesData.map((user, index) => (
            <StoryAvatar user={user} index={index} />
          ))}
        </div>
        
          <button
            onClick={() => {
              setScrollLeft((s) => Math.min(0, s + containerWidth / 2));
            }}
            className={classnames("story-nav-prev", {
              hidden: scrollLeft === 0,
            })}
          >
            <ChevronLeft />
          </button>

          <button
            onClick={() => {
              setScrollLeft((s) =>
                Math.max(scrollLimit, s - containerWidth / 2)
              );
            }}
            className={classnames("story-nav-next", {
              hidden: scrollLeft <= scrollLimit,
            })}
          >
            <ChevronRight />
          </button>
        
      </div>
    </div>
  );
}
