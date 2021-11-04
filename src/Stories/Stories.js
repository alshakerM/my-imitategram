import storiesData from "../Data/IG-Stories.json";
import "./Stories.css";

export function Stories() {
  return (
    <div className="stories-container">
      <div className="all-circles">
        {storiesData.map((story) =>
          story.stories.map((sto) => (
            <div className="circle">
                
              <div className="circle2">
              <img src={sto.user_thumbnail} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
