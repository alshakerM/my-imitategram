import { Post } from "./Post/Post";
import React from "react";
import "./App.css";
import data from "./Data/MOCK_DATA.json";
import { NavBar } from "./NavBar/NavBar";
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

export function HomePage() {
  const [backgroundColor, setBackgroundColor] = React.useState(false);
  backgroundColor ? disableBodyScroll(document) : enableBodyScroll(document)
  return (
    <div
      style={
        backgroundColor
          ? { backgroundColor: "rgba(0, 0, 0, 0.8)" }
          : { backgroundColor: "" }
      }
      className="content-section"
    >
      <NavBar backgroundColor={backgroundColor} />
      {data.map((datum) => (
        <Post
          datum={datum}
          backgroundColor={backgroundColor}
          comments={datum.comments}
          setBackgroundColor={setBackgroundColor}
        />
      ))}
    </div>
  );
}
