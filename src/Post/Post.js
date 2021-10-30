import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import ShareIcon from "@mui/icons-material/Share";

import { Comments } from "../Comments/Comments";
import React from "react";

import "./Post.css";

export function Post({ datum, backgroundColor, comments, setBackgroundColor }) {
  const [trigger, setTrigger] = React.useState(false);
  return (
    <div className="content">
      <div className="card-container">
        <div style={backgroundColor ? {background: "none", border: "none"} : {backgroundColor: "#fff"}} id="card">
          <div className="card-header">
            <img src={datum.user_thumbnail} className="user-avatar" alt="" />
            <div className="user-info">
              <h2 className="user-name">{datum.user_name}</h2>
              <p className="user-location">{datum.city}</p>
            </div>
            <MoreHoriz className="more-icon" />
          </div>
          <div>
            <img className="post-img" src={datum.post_image} alt="" />
          </div>
          <div>
            {datum.is_post_liked ? (
              <FavoriteIcon style={{ color: "red", margin: "0 2%" }} />
            ) : (
              <FavoriteIcon style={{ margin: "0 2%" }} />
            )}
            <ShareIcon />
          </div>
          <div className="post-caption-section">
            <p className="like-count">{datum.likes_count} likes</p>
            <div className="comment-section">
              <p className="comment-user">{datum.comments[0].user_name}</p>
              <p className="comment-text">{datum.comments[0].comment}</p>
            </div>
            <div className="comment-section">
              <p className="comment-user">{datum.comments[1].user_name}</p>
              <p className="comment-text">{datum.comments[1].comment}</p>
            </div>
            <div className="comment-section">
              <p className="comment-user">{datum.comments[2].user_name}</p>
              <p className="comment-text">{datum.comments[2].comment}</p>
            </div>
            <div>
              <button
                onClick={() => {
                  setTrigger(true);
                  setBackgroundColor(true);
                }}
              >
                View all comments{" "}
              </button>
              <Comments
                datum={datum}
                trigger={trigger}
                setTrigger={setTrigger}
                setBackgroundColor={setBackgroundColor}
              />
            </div>
            {console.log(comments[0].comment)}
            <p>{datum.post_caption}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
