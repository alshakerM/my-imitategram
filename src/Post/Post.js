import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import { useHistory } from "react-router";
import React from "react";
import "./Post.css";
import { Link } from "react-router-dom";
import classnames from "classnames";

function PostActions(is_post_liked) {
  return (
    <div className="post-actions">
      <div className="like-share-telegram-icons">
        <svg
          aria-label="Unlike"
          class="_8-yf5 "
          color={is_post_liked ? "#ed4956" : "#8e8e8e"}
          fill={is_post_liked ? "#ed4956" : "#8e8e8e"}
          height="24"
          role="img"
          viewBox="0 0 48 48"
          width="24"
        >
          <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
        </svg>

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
          fill="#8e8e8e"
          height="22"
          role="img"
          viewBox="0 0 48 48"
          width="22"
        >
          <path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path>
        </svg>
      </div>
      <svg
        aria-label="Save"
        className="save-icon"
        color="#8e8e8e"
        fill="#8e8e8e"
        height="24"
        role="img"
        viewBox="0 0 48 48"
        width="24"
      >
        <path d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 1.4-.9 2.2-.9z"></path>
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
function PostDate({ posting_time, isExtended }) {
  TimeAgo.addDefaultLocale(en);
  const timeAgo = new TimeAgo("en-US");
  const postDate = timeAgo.format(new Date(posting_time));
  return (
    <p className={isExtended ? "extended-post-time" : "post-time"}>
      {postDate.toUpperCase()}
    </p>
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
        <p className="like-count-section">
          <div className="comment-caption-avatar">
            <img
              className="post-caption-user-avatar"
              src={datum.user_thumbnail}
            />
            <p className="like-count">
              Liked by <strong>{datum.user_name}</strong> and{" "}
              <strong>{datum.likes_count} others </strong>
            </p>
          </div>
        </p>
        <p className="post-caption-text">{datum.post_caption}</p>
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
          <div className="comment-info">
            <p className="comment-username-comment-text">
              <strong>{datum.comments[0].user_name}</strong>{" "}
              {datum.comments[0].comment}
            </p>
            <p>
              <svg
                aria-label="Like"
                class="_8-yf5 "
                color={
                  datum.comments[0].is_liked_by_user ? "#ed4956" : "#8e8e8e"
                }
                fill={
                  datum.comments[0].is_liked_by_user ? "#ed4956" : "#8e8e8e"
                }
                height="12"
                role="img"
                viewBox="0 0 48 48"
                width="12"
              >
                <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
              </svg>
            </p>
          </div>
          <div className="comment-info">
            <p className="comment-username-comment-text">
              <strong>{datum.comments[1].user_name}</strong>{" "}
              {datum.comments[1].comment}
            </p>
            <p>
              <svg
                aria-label="Like"
                class="_8-yf5 "
                color={
                  datum.comments[1].is_liked_by_user ? "#ed4956" : "#8e8e8e"
                }
                fill={
                  datum.comments[1].is_liked_by_user ? "#ed4956" : "#8e8e8e"
                }
                height="12"
                role="img"
                viewBox="0 0 48 48"
                width="12"
              >
                <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
              </svg>
            </p>
          </div>
          <PostDate posting_time={datum.posting_time} isExtended={isExtended} />
        </div>{" "}
      </div>
      <PostInput />
    </>
  );

  const expandedContent = (
    <>
      <div className="floating-post-container">
        <img className="post-img-extended" src={datum.post_image} alt="" />
        <div className="content-section">
          <PostHeader
            city={datum.city}
            user_name={datum.user_name}
            isExtended
            user_thumbnail={datum.user_thumbnail}
          />
          <div className="extended-comment-section">
            <div className="extended-post-caption-avatar-text">
              <img
                className="extended-caption-user-avatar"
                src={datum.user_thumbnail}
              />
              <p className="post-caption-extended">
                <span>
                  <strong>{datum.user_name}</strong>
                </span>{" "}
                {datum.post_caption}
              </p>
            </div>
            {datum.comments.map((comment) => (
              <div className="extended-comment">
                <img
                  className="extended-comment-user-avatar"
                  src={datum.user_thumbnail}
                />
                <div className="extended-comment-username-comment">
                  <div className="extended-comment-user-info">
                    <p>
                      <strong>{comment.user_name}</strong> {comment.comment}
                    </p>
                  </div>
                  <div className="extended-post-like-replay-section">
                    <button className="extended-comment-time">2 w</button>
                    <button className="like-button">
                      {comment.comment_likes}{" "}
                      <strong>
                      {comment.comment_likes > 0 ? "Likes" : "like"}{" "}</strong>
                    </button>
                    <button className="reply-button"><strong>Reply</strong></button>
                  </div>
                </div>
                <svg
                  aria-label="Like"
                  class="_8-yf5 "
                  color={comment.is_liked_by_user ? "#ed4956" : "#8e8e8e"}
                  fill={comment.is_liked_by_user ? "#ed4956" : "#8e8e8e"}
                  height="12"
                  role="img"
                  viewBox="0 0 48 48"
                  width="12"
                >
                  <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                </svg>
              </div>
            ))}
          </div>
          <PostActions is_post_liked={datum.is_post_liked} />
          <p className="likes-count">
            Liked by <strong>{datum.user_name}</strong> and{" "}
            <strong>{datum.likes_count} others </strong>
          </p>
          <PostDate posting_time={datum.posting_time} isExtended={isExtended} />
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
