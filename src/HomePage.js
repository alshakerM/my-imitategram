import { Post } from "./Post/Post";
import React from "react";
import "./App.css";
import data from "./Data/MOCK_DATA.json";
import { NavBar } from "./NavBar/NavBar";

export function HomePage() {
  return (
    <div className="content-section">
      <NavBar />
      {data.map((datum) => (
        <Post datum={datum} comments={datum.comments} />
      ))}
    </div>
  );
}


