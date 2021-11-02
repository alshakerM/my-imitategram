import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import { useHistory } from "react-router";
import React from "react";
import "./Post.css";
import { Link } from "react-router-dom";
import classnames from "classnames";
function PostActions(is_post_liked) {
  return (
    <div className="post-actions">
      <FavoriteIcon style={is_post_liked ? { color: "red" } : {}} />
      <svg
        aria-label="Comment"
        className="comment-icon"
        color="#8e8e8e"
        fill="#8e8e8e"
        height="24"
        role="img"
        viewBox="0 0 48 48"
        width="24"
      >
        <path
          clip-rule="evenodd"
          d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z"
          fill-rule="evenodd"
        ></path>
      </svg>
      <svg
        aria-label="Direct"
        className="telegram-icon"
        color="#262626"
        fill="#262626"
        height="22"
        role="img"
        viewBox="0 0 48 48"
        width="22"
      >
        <path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path>
      </svg>
    </div>
  );
}

function PostInput() {
  return (
    <div className="comment-input-section">
      <svg
        className="emoji"
        aria-label="Emoji"
        color="#262626"
        fill="#262626"
        height="28"
        role="img"
        viewBox="0 0 48 48"
        width="24"
      >
        <path d="M24 48C10.8 48 0 37.2 0 24S10.8 0 24 0s24 10.8 24 24-10.8 24-24 24zm0-45C12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21S35.6 3 24 3z"></path>
        <path d="M34.9 24c0-1.4-1.1-2.5-2.5-2.5s-2.5 1.1-2.5 2.5 1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5zm-21.8 0c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5-2.5-1.1-2.5-2.5zM24 37.3c-5.2 0-8-3.5-8.2-3.7-.5-.6-.4-1.6.2-2.1.6-.5 1.6-.4 2.1.2.1.1 2.1 2.5 5.8 2.5 3.7 0 5.8-2.5 5.8-2.5.5-.6 1.5-.7 2.1-.2.6.5.7 1.5.2 2.1 0 .2-2.8 3.7-8 3.7z"></path>
      </svg>
      <input className="comment-input" placeholder="Add a comment..." />
      <button className="post-button">Post</button>
    </div>
  );
}

function PostHeader({ user_name, isExtended, user_thumbnail, city }) {
  return (
    <div className={isExtended ? "post-header-extended" : "post-header"}>
      <img src={user_thumbnail} className="user-avatar" alt="" />
      <div className="user-info">
        <h2 className="user-name">{user_name}</h2>
        <p className="user-location">{city}</p>
      </div>

      <MoreHoriz className="more-icon" />
    </div>
  );
}

export function Post({ datum, isExtended, setIsExtended, index, isFloating }) {
  const content = (
    <>
      <PostHeader
        city={datum.city}
        user_name={datum.user_name}
        user_thumbnail={datum.user_thumbnail}
      />
      <div className="img-container">
        <img className="post-img" src={datum.post_image} alt="" />
      </div>
      <PostActions is_post_liked={datum.is_post_liked} />
      <div className="post-caption-and-like-section">
        <p className="like-count">
          Liked by <strong>{datum.user_name}</strong> and{" "}
          <strong>{datum.likes_count} others </strong>
        </p>
        <p>{datum.post_caption}</p>
        <Link
          to={`/p/${index}`}
          className="view-comments-button"
          onClick={() => {
            setIsExtended(true);
          }}
        >
          View all comments{" "}
        </Link>
        <div className="comment-section">
          <p className="comment-info">
            <strong>{datum.comments[0].user_name}</strong>{" "}
            {datum.comments[0].comment}
          </p>
          <p className="comment-info">
            <strong>{datum.comments[1].user_name}</strong>{" "}
            {datum.comments[1].comment}
          </p>
        </div>{" "}
      </div>
      <PostInput />
    </>
  );

  const expandedContent = (
    <>
      <div className="floating-post-container">
        <img className="post-img-extended" src={datum.post_image} alt="" />
        <div className="contents-section">
          <PostHeader
            city={datum.city}
            user_name={datum.user_name}
            isExtended
            user_thumbnail={datum.user_thumbnail}
          />
          <p>
            <span className="post-caption-extended">{datum.user_name}</span>{" "}
            {datum.post_caption}
          </p>
          <div className="extended-comment-section">
            {datum.comments.map((comment) => (
              <div className="extended-comment">
                <p className="comment-user">
                  <strong>{comment.user_name}</strong> {comment.comment}
                </p>
              </div>
            ))}
          </div>
          <PostActions is_post_liked={datum.is_post_liked} />
          <p className="likes-count">
            Liked by <strong>{datum.user_name}</strong> and{" "}
            <strong>{datum.likes_count} others </strong>
          </p>
          <PostInput />
        </div>
      </div>
    </>
  );
  const history = useHistory();
  return (
    <div
      onClick={(event) =>
        event.target === event.currentTarget && history.push("/")
      }
      className={classnames("post-overlay", {
        "is-extended": isExtended,
        "is-floating": isFloating,
      })}
    >
      <div className={isExtended ? "extended-content" : "content"}>
        {isExtended ? (
          expandedContent
        ) : (
          <div className="post-container">{[content]}</div>
        )}
      </div>
    </div>
  );
}
