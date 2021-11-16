import { Post } from './Post/Post';
import React from 'react';
import './App.css';
import { Stories } from './Stories/Stories';
import { useIGData } from './hooks/useIGData';

export function HomePage({ isExpanded, setIsExpanded }) {
  const {data} = useIGData();
  return (
    <div className="content-section">
      <Stories />
      {data.map((datum, index) => (
        <Post
          datum={datum}
          comments={datum.comments}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          index={index}
        />
      ))}
    </div>
  );
}
