import { Post } from './Post/Post';
import React from 'react';
import './App.css';
import { Stories } from './Stories/Stories';
import { useIGData } from './hooks/useIGData';
import { Avatar } from './Avatar/Avatar';
import { Link } from 'react-router-dom';
import { Suggestions } from './Suggestions/Suggestions';

export function HomePage({ isExpanded, setIsExpanded }) {
  const { data } = useIGData();
  const [suggestionsData, setSuggestionsData] = React.useState([]);
  return (
    <div className="content-section">
      <Stories />
      {data?.map((datum, index) => (
        <Post
          datum={datum}
          comments={datum?.comments}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          index={index}
          key={datum.post_id}
        />
      ))}
      <Suggestions isExpanded={false} />
    </div>
  );
}
