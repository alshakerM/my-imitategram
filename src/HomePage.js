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
  React.useEffect(() => {
    fetch('../Data/suggestions.json', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((results) => setSuggestionsData(results));
  }, []);
  const slicedSuggestionData = suggestionsData.slice(0, 5);
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
      <Suggestions isExpanded={true} />
    </div>
  );
}
