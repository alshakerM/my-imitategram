import { Post } from './Post/Post';
import React from 'react';
import './App.css';
import { Stories } from './Stories/Stories';
import { useIGData } from './hooks/useIGData';
import { Avatar } from './Avatar/Avatar';
import { Link } from 'react-router-dom';

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
      <div className="suggestion-section">
        <div className="suggestion-text-see-button">
          <p className="suggestion-text">Suggestions for you</p>
          <Link to="/explore/people/" className="see-all-button">
            See All
          </Link>
        </div>
        <div className="suggestion-content-section">
          {slicedSuggestionData.map((suggestionDatum) => (
            <div className="suggestion-content" key={suggestionDatum.user_id}>
              <Avatar size="42" src={suggestionDatum.user_thumbnail} />
              <div className="suggestion-user-name-reason">
                <p className="suggestion-user-name">
                  {suggestionDatum.user_name}
                </p>
                <p className="suggestion-reason">{suggestionDatum.reason}</p>
              </div>
              <button className="suggestion-follow-button">Follow</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
