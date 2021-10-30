import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreHoriz from "@mui/icons-material/MoreHoriz";

import "./Comments.css";

export function Comments({ datum, trigger, setTrigger, setBackgroundColor }) {
  return trigger ? (
    <div className="card-container2">
      <div className="post-img-container">
        <img className="post-img2" src={datum.post_image} alt="" />

        <div id="card2">
          <div className="card-header2">
            <img src={datum.user_thumbnail} className="user-avatar2" alt="" />
            <div className="user-info2">
              <h2 className="user-name2">{datum.user_name}</h2>
              <p className="user-location2">{datum.city}</p>
            </div>
            <MoreHoriz className="more-icon2" />
          </div>
          <div className="post-caption-pop">
            <p>
              <span className="post-caption-pop-username">
                {datum.user_name}
              </span>{" "}
              {datum.post_caption}
            </p>
            <div className="comment-section-comments">
              {datum.comments.map((comment) => (
                <div className="comment-section">
                  <p className="comment-user">
                    <img
                      className="comment-user-avatar"
                      src={datum.user_thumbnail}
                    />
                    {comment.user_name}
                  </p>
                  <p className="comment-text">{comment.comment}</p>
                </div>
              ))}
            </div>
            <div className="like-share-icons-section">
              {datum.is_post_liked ? (
                <FavoriteIcon
                  fontSize="large"
                  style={{ color: "red", margin: "0 2%" }}
                />
              ) : (
                <FavoriteIcon fontSize="large" style={{ margin: "0 2%" }} />
              )}
              <svg
                aria-label="Comment"
                class="_8-yf5 "
                color="#8e8e8e"
                fill="#8e8e8e"
                height="35"
                role="img"
                viewBox="0 0 48 48"
                width="30"
              >
                <path
                  clip-rule="evenodd"
                  d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z"
                  fill-rule="evenodd"
                ></path>
              </svg>
              <svg
                className="share-icon"
                aria-label="Share Post"
                color="#8e8e8e"
                fill="#8e8e8e"
                height="35"
                role="img"
                viewBox="0 0 48 48"
                width="30"
              >
                <path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path>
              </svg>
            </div>

            <div className="is-liked">
              <p className="is-liked-text">
                <img className="liked-user-avatar" src={datum.user_thumbnail} />
                Liked by&nbsp;
                <span style={{ fontWeight: "bold" }}>
                  {datum.user_name}&nbsp;
                </span>{" "}
                and&nbsp;<span style={{ fontWeight: "bold" }}>80 others</span>
              </p>
              <p className="time">October 15</p>
              <button
                className="close-button"
                onClick={() => {
                  setBackgroundColor(false);
                  setTrigger(false);
                }}
              >
                <svg
                  aria-label="Close"
                  className="_8-yf5 "
                  color="#ffffff"
                  fill="#ffffff"
                  height="24"
                  role="img"
                  viewBox="0 0 48 48"
                  width="24"
                >
                  <path
                    clip-rule="evenodd"
                    d="M41.8 9.8L27.5 24l14.2 14.2c.6.6.6 1.5 0 2.1l-1.4 1.4c-.6.6-1.5.6-2.1 0L24 27.5 9.8 41.8c-.6.6-1.5.6-2.1 0l-1.4-1.4c-.6-.6-.6-1.5 0-2.1L20.5 24 6.2 9.8c-.6-.6-.6-1.5 0-2.1l1.4-1.4c.6-.6 1.5-.6 2.1 0L24 20.5 38.3 6.2c.6-.6 1.5-.6 2.1 0l1.4 1.4c.6.6.6 1.6 0 2.2z"
                    fill-rule="evenodd"
                  ></path>
                </svg>
              </button>
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
                <input
                  className="comment-input"
                  placeholder="Add a comment..."
                />
                <button className="post-button">Post</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}
