import MoreHoriz from '@mui/icons-material/MoreHoriz';
import cx from 'classnames';
import React from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Avatar } from '../Avatar/Avatar';
import { useIGData } from '../hooks/useIGData';
import { CircularChevron } from '../Icons/CircularChevron';
import { PostImage } from '../PostImage/PostImage';
import { PostVideo } from '../PostVideo/PostVideo';
import { absoluteToRelativeDate, digitGrouping } from '../utils';
import './Post.css';

const INDEPENDENT_POST_HEIGHT = 600;

function calculatePostDimensions(post, isInFeed) {
  const postAspectRatio =
    post?.media_dimensions.width / post?.media_dimensions.height;
  if (isInFeed) {
    const VERTICAL_MARGIN = 24;
    const height = window.innerHeight - VERTICAL_MARGIN * 2;
    const width = height * postAspectRatio;
    return { width, height };
  } else {
    const height = INDEPENDENT_POST_HEIGHT;
    const width = height * postAspectRatio;
    return { width, height };
  }
}

function LikeButton({ is_post_liked, onClick, height = '24', width = '28' }) {
  return (
    <button className="post-like-button" onClick={onClick}>
      <svg
        aria-label="like-icon"
        height={height}
        role="img"
        viewBox="0 0 48 48"
        width={width}
      >
        <path
          className={cx('like-icon', {
            'is-liked': is_post_liked,
          })}
          d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"
        ></path>
      </svg>
    </button>
  );
}
function PostActions({ index, is_post_liked, isExpanded }) {
  const { toggleLike } = useIGData();
  return (
    <section
      className={cx('post-actions', {
        'is-expanded': isExpanded,
      })}
    >
      <div className="like-share-telegram-icons">
        <LikeButton
          is_post_liked={is_post_liked}
          onClick={() => toggleLike(index)}
        />
        <svg
          aria-label="Comment"
          className="action-icons"
          color="#262626"
          height="24"
          role="img"
          viewBox="0 0 48 48"
          width="24"
        >
          <path
            clipRule="evenodd"
            d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z"
            fillRule="evenodd"
          ></path>
        </svg>
        <svg
          aria-label="Direct"
          className="action-icons"
          color="#262626"
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
        className="action-icon"
        color="#262626"
        height="24"
        role="img"
        viewBox="0 0 48 48"
        width="24"
      >
        <path d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 1.4-.9 2.2-.9z"></path>
      </svg>
    </section>
  );
}

function PostInput({ index, isExpanded }) {
  const { addComment } = useIGData();
  return (
    <section
      className={cx('comment-input-section', {
        'is-expanded': isExpanded,
      })}
    >
      <svg
        className="emoji"
        aria-label="Emoji"
        color="#262626"
        height="28"
        role="img"
        viewBox="0 0 48 48"
        width="24"
      >
        <path d="M24 48C10.8 48 0 37.2 0 24S10.8 0 24 0s24 10.8 24 24-10.8 24-24 24zm0-45C12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21S35.6 3 24 3z"></path>
        <path d="M34.9 24c0-1.4-1.1-2.5-2.5-2.5s-2.5 1.1-2.5 2.5 1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5zm-21.8 0c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5-2.5-1.1-2.5-2.5zM24 37.3c-5.2 0-8-3.5-8.2-3.7-.5-.6-.4-1.6.2-2.1.6-.5 1.6-.4 2.1.2.1.1 2.1 2.5 5.8 2.5 3.7 0 5.8-2.5 5.8-2.5.5-.6 1.5-.7 2.1-.2.6.5.7 1.5.2 2.1 0 .2-2.8 3.7-8 3.7z"></path>
      </svg>
      <form
        className="post-comment-input"
        onSubmit={(event) => {
          event.preventDefault();
          const comment = event.target.commentBody.value;
          addComment(index, comment, 'mdoggett0');
        }}
      >
        <input
          name="commentBody"
          className="comment-input"
          placeholder="Add a comment..."
        />
        <button className="post-button">
          <strong>Post</strong>
        </button>
      </form>
    </section>
  );
}
function PostDate({ posting_time, isExpanded }) {
  return (
    <section className="post-time-section">
      <p
        className={cx('post-time', {
          'is-expanded': isExpanded,
        })}
      >
        {absoluteToRelativeDate(posting_time, 'mini').toUpperCase()}
      </p>
    </section>
  );
}

function PostHeader({ user_name, city, datum, isExpanded }) {
  return (
    <section className={cx('post-header', { 'is-expanded': isExpanded })}>
      <Avatar
        user={datum}
        size="small"
        colorRing={datum?.poster_has_story}
        className={cx('post-header-profile-pic', { 'is-expanded': isExpanded })}
      />

      <div className="user-info">
        <Link to={`/${user_name}`} className="user-name">
          {user_name}
        </Link>
        <p className="user-location">{city}</p>
      </div>

      <MoreHoriz className="more-icon" />
    </section>
  );
}
function CommentReplySection({ comment, postIndex }) {
  const { toggleCommentReplyLike } = useIGData();
  return (
    <div className="reply-section">
      {comment.replies.map((reply) => (
        <div key={reply.comment_id} className="replier-section">
          <div className="replier-info">
            <Avatar user={reply} size="24" />

            <p className="replier-username-text">
              <strong>{reply.user_name}</strong> {reply.comment}
            </p>
            <LikeButton
              is_post_liked={reply.is_liked_by_user}
              onClick={() =>
                toggleCommentReplyLike(
                  postIndex,
                  comment.comment_id,
                  reply.comment_id
                )
              }
              height="12"
              width="12"
            />
          </div>
          <div>
            <time className="reply-post-date">
              {absoluteToRelativeDate(reply?.posted_on, 'mini')}
            </time>
            <button className="reply-action">
              <strong>
                {digitGrouping(reply.comment_likes)}
                {reply.comment_likes > 0 ? ' likes' : ' like'}
              </strong>
            </button>
            <button className="reply-action">
              <strong>Reply</strong>
            </button>
            <button className="three-dots-button">
              <svg
                aria-label="Comment options"
                fill="#8e8e8e"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
              >
                <circle cx="12" cy="12" r="1.5"></circle>
                <circle cx="6.5" cy="12" r="1.5"></circle>
                <circle cx="17.5" cy="12" r="1.5"></circle>
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
function CommentSection({
  postIndex,
  comments,
  isExpanded,
  setIsExpanded,
  datum,
}) {
  const commentsSummary = comments?.slice(0, isExpanded ? undefined : 2);
  const [activeCommentId, setActiveCommentId] = React.useState(undefined);
  const { toggleCommentLike } = useIGData();
  return (
    <section
      className={cx('comments-section', {
        'is-expanded': isExpanded,
      })}
    >
      {!isExpanded && (
        <div>
          <Link
            to={`/p/${postIndex}`}
            className="view-comments-button"
            onClick={() => {
              setIsExpanded(true);
            }}
          >
            View all comments
          </Link>
        </div>
      )}
      {isExpanded && (
        <section
          className={cx('post-caption-section', {
            'is-expanded': isExpanded,
          })}
        >
          <Avatar user={datum} size="32" />
          <p className="post-caption-text">
            <span className="comment-username">{datum?.user_name}</span>{' '}
            {datum?.post_caption}
          </p>
        </section>
      )}
      {commentsSummary?.map((comment) => {
        return (
          <div
            key={comment.comment_id}
            className={cx('comment-wrapper', {
              'is-expanded': isExpanded,
            })}
          >
            <div className="comment-body">
              {isExpanded && <Avatar user={comment} size="32" />}
              <p className="comment-text">
                <span className="comment-username">{comment.user_name}</span>{' '}
                {comment.comment}
              </p>
              {isExpanded && (
                <LikeButton
                  is_post_liked={comment.is_liked_by_user}
                  onClick={() =>
                    toggleCommentLike(postIndex, comment.comment_id)
                  }
                  height="12"
                  width="12"
                />
              )}
            </div>
            {isExpanded && (
              <div>
                <div className="comment-action-container">
                  <time className="comment-action">
                    {absoluteToRelativeDate(comment?.posted_on, 'mini')}
                  </time>
                  <button className="comment-action">
                    <strong>
                      {digitGrouping(comment.comment_likes)}
                      {comment.comment_likes > 0 ? ' likes' : ' like'}
                    </strong>
                  </button>
                  <button className="comment-action">
                    <strong>Reply</strong>
                  </button>

                  <button className="three-dots-button">
                    <svg
                      aria-label="Comment options"
                      fill="#8e8e8e"
                      height="24"
                      role="img"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <circle cx="12" cy="12" r="1.5"></circle>
                      <circle cx="6.5" cy="12" r="1.5"></circle>
                      <circle cx="17.5" cy="12" r="1.5"></circle>
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {comment.replies.length > 0 && isExpanded && (
              <div className="view-replies-section">
                <button
                  className="view-replies-button"
                  onClick={() => {
                    setActiveCommentId(
                      activeCommentId === comment.comment_id
                        ? undefined
                        : comment.comment_id
                    );
                  }}
                >
                  <div className="view-replies-line"></div>
                  {comment.comment_id === activeCommentId
                    ? 'Hide replies'
                    : `View replies (${digitGrouping(comment.replies.length)})`}
                </button>
                {comment.comment_id === activeCommentId && (
                  <CommentReplySection
                    comment={comment}
                    toggleCommentLike={toggleCommentLike}
                    postIndex={postIndex}
                  />
                )}
              </div>
            )}
            {!isExpanded && (
              <LikeButton
                is_post_liked={comment.is_liked_by_user}
                onClick={() => toggleCommentLike(postIndex, comment.comment_id)}
                height="12"
                width="12"
              />
            )}
          </div>
        );
      })}
    </section>
  );
}

function MediaSection({ post, isExpanded, dimensions }) {
  const items = post.media_items;
  const aspectRatio = `${post.media_dimensions.width} / ${post.media_dimensions.height}`;
  const [mediaIndex, setMediaIndex] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <>
      <section
        className={cx('media-section', { 'is-expanded': isExpanded })}
        style={{ maxWidth: isExpanded ? dimensions.width : 614 }}
      >
        <div
          className="media-container"
          style={{
            transform: `translateX(${(-mediaIndex * 100) / items.length}%)`,
            width: `${100 * items.length}%`,
          }}
        >
          {items?.map((mediaItem, index) =>
            mediaItem.type === 'photo' ? (
              <PostImage
                key={index}
                imageURL={mediaItem.url}
                fraction={1 / items.length}
                aspectRatio={aspectRatio}
                setIsLoading={setIsLoading}
                isLoading={isLoading}
              />
            ) : (
              <PostVideo
                key={index}
                videoURL={mediaItem.url}
                active={mediaIndex === index}
                fraction={1 / items.length}
                aspectRatio={aspectRatio}
                setIsLoading={setIsLoading}
                isLoading={isLoading}
              />
            )
          )}
        </div>
        {items.length > 1 && !isLoading && (
          <div className="img-buttons-container">
            <button
              className={cx('prev-img-button', { hidden: mediaIndex === 0 })}
              onClick={() => setMediaIndex(mediaIndex - 1)}
            >
              <CircularChevron size="24" />
            </button>
            <button
              className={cx('next-img-button', {
                hidden: mediaIndex === items.length - 1,
              })}
              onClick={() => setMediaIndex(mediaIndex + 1)}
            >
              <CircularChevron size="24" direction="left" />
            </button>
          </div>
        )}
      </section>
      <section
        className={cx('progress-dots-section', {
          'is-expanded': isExpanded,
        })}
      >
        {items.length > 1 && (
          <div className="progress-dots">
            {items.map((_, index) => (
              <div
                key={index}
                className={cx('progress-dot', {
                  'is-active': index === mediaIndex,
                  'is-expanded': isExpanded,
                })}
              ></div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
export function Post({ datum, isExpanded, setIsExpanded, index, isFloating }) {
  const [dimensions, setDimensions] = React.useState(
    calculatePostDimensions(datum, isFloating)
  );

  React.useEffect(() => {
    function handler() {
      setDimensions(calculatePostDimensions(datum, isFloating));
    }
    window.addEventListener('resize', handler);

    return () => {
      window.removeEventListener('resize', handler);
    };
  }, []);
  const history = useHistory();
  return (
    <article
      key={datum?.post_id}
      onClick={(event) => {
        if (event.target === event.currentTarget && isFloating) {
          setIsExpanded(false);
          history.push('/');
        }
      }}
      className={cx('post-overlay', {
        'is-floating': isFloating,
      })}
    >
      <div
        className={cx('post-content', {
          'is-expanded': isExpanded,
          'is-floating': isFloating,
        })}
      >
        <>
          <PostHeader
            city={'Baghdad'}
            user_name={datum?.user_name}
            user_thumbnail={datum?.user_thumbnail}
            datum={datum}
            isExpanded={isExpanded}
          />

          <MediaSection
            isExpanded={isExpanded}
            dimensions={dimensions}
            post={datum}
          />

          <PostActions
            index={index}
            is_post_liked={datum?.is_post_liked}
            isExpanded={isExpanded}
          />

          <section className="like-count">
            Liked by <strong>{datum?.user_name}</strong> and
            <strong> {digitGrouping(datum?.likes_count)} others </strong>
          </section>
          {!isExpanded && (
            <section className="post-caption-section">
              <p className="post-caption-text">
                <strong>{datum?.user_name}</strong> {datum?.post_caption}
              </p>
            </section>
          )}
          <CommentSection
            datum={datum}
            postIndex={index}
            setIsExpanded={setIsExpanded}
            comments={datum?.comments}
            isExpanded={isExpanded}
            key={datum.post_id}
          />
          <PostDate
            posting_time={datum?.posting_time}
            isExpanded={isExpanded}
          />
          <PostInput index={index} isExpanded={isExpanded} />
        </>
      </div>
    </article>
  );
}
