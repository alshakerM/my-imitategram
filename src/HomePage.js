import { Post } from "./Post/Post";
import React from "react";
import "./App.css";
import data from "./Data/IG.json";
import { Stories } from "./Stories/Stories";


export function HomePage({ isExtended, setIsExtended }) {
  return (
    <div className="content-section">
      <Stories />
      {data.map((datum, index) => (
        <Post
          datum={datum}
          comments={datum.comments}
          isExtended={isExtended}
          setIsExtended={setIsExtended}
          index={index}
        />
      ))}
    </div>
  );
}
