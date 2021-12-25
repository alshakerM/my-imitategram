import MoreHoriz from '@mui/icons-material/MoreHoriz';
import { useDispatch, useSelect } from '@wordpress/data';
import cx from 'classnames';
import React from 'react';
import { useEffect } from 'react';
import Link from 'next/link';
import { Avatar } from '../Avatar/Avatar';
import { CircularChevron } from '../Icons/CircularChevron';
import { PostImage } from '../PostImage/PostImage';
import { PostVideo } from '../PostVideo/PostVideo';
import { absoluteToRelativeDate, digitGrouping } from '../../utils';
import styles from './Post.module.css';
import '../../stores/postStore';

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
    <button className={styles.postLikeButton} onClick={onClick}>
      <svg
        aria-label="like-icon"
        height={height}
        role="img"
        viewBox="0 0 48 48"
        width={width}
      >
        <path
          className={cx(styles.likeIcon, {
            [styles.isLiked]: is_post_liked,
          })}
          d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"
        ></path>
      </svg>
    </button>
  );
}
function PostActions({ index, is_post_liked, isExpanded }) {
  const { togglePostLike } = useDispatch('ig-posts');
  return (
    <section
      className={cx(styles.postActions, {
        [styles.isExpanded]: isExpanded,
      })}
    >
      <div className={styles.likeShareTelegramIcons}>
        <LikeButton
          is_post_liked={is_post_liked}
          onClick={() => togglePostLike(index)}
        />
        <svg
          aria-label="Comment"
          className={styles.actionIcons}
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
          className={styles.actionIcons}
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
        className={styles.actionIcon}
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
  const inputRef = React.useRef();
  const { submitComment } = useDispatch('ig-posts');
  const { setCommentFieldText } = useDispatch('ig-posts');
  const commentFieldText = useSelect((select) =>
    select('ig-posts').getCommentFieldText()
  );
  const commentFieldCommentId = useSelect((select) =>
    select('ig-posts').getCommentFieldCommentId()
  );
  useEffect(() => {
    if (commentFieldCommentId) {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(100, 100);
    }
  }, [commentFieldCommentId]);
  return (
    <section
      className={cx(styles.commentInputSection, {
        [styles.isExpanded]: isExpanded,
      })}
    >
      <svg
        className={styles.emoji}
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
        className={styles.postCommentInput}
        onSubmit={(event) => {
          event.preventDefault();
          const comment = event.target.commentBody.value;
          submitComment(index, comment);
        }}
      >
        <input
          name="commentBody"
          ref={inputRef}
          className={styles.commentInput}
          placeholder="Add a comment..."
          onChange={(e) => setCommentFieldText(e.target.value)}
          value={commentFieldText}
        />
        <button disabled={!commentFieldText} className={styles.postButton}>
          <strong>Post</strong>
        </button>
      </form>
    </section>
  );
}
function PostDate({ posting_time, isExpanded }) {
  return (
    <section className={styles.postTimeSection}>
      <p
        className={cx(styles.postTime, {
          [styles.isExpanded]: isExpanded,
        })}
      >
        {absoluteToRelativeDate(posting_time, 'mini').toUpperCase()}
      </p>
    </section>
  );
}

function PostHeader({ user_name, city, datum, isExpanded }) {
  return (
    <section
      className={cx(styles.postHeader, { [styles.isExpanded]: isExpanded })}
    >
      <Avatar
        user={datum}
        size="small"
        colorRing={datum?.poster_has_story}
        className={cx(styles.postHeaderProfilePic, {
          [styles.isExpanded]: isExpanded,
        })}
      />

      <div className={styles.userInfo}>
        <Link href={`/${user_name}`} className={styles.userName}>
          {user_name}
        </Link>
        <p className={styles.userLocation}>{city}</p>
      </div>

      <MoreHoriz className={styles.moreIcon} />
    </section>
  );
}
function CommentReplySection({ comment, postIndex }) {
  const { toggleReplyLike } = useDispatch('ig-posts');
  return (
    <div className={styles.replySection}>
      {comment.replies.map((reply) => (
        <div key={reply.comment_id} className={styles.replierSection}>
          <div className={styles.replierInfo}>
            <Avatar user={reply} size="24" />

            <p className={styles.replierUsernameText}>
              <strong>{reply.user_name}</strong> {reply.comment}
            </p>
            <LikeButton
              is_post_liked={reply.is_liked_by_user}
              onClick={() =>
                toggleReplyLike(postIndex, comment.comment_id, reply.comment_id)
              }
              height="12"
              width="12"
            />
          </div>
          <div>
            <time className={styles.replyPostDate}>
              {absoluteToRelativeDate(reply?.posted_on, 'mini')}
            </time>
            <button className={styles.replyAction}>
              <strong>
                {digitGrouping(reply.comment_likes)}
                {reply.comment_likes > 0 ? ' likes' : ' like'}
              </strong>
            </button>
            <button className={styles.replyAction}>
              <strong>Reply</strong>
            </button>
            <button className={styles.threeDotsButton}>
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
  expandPost,
  datum,
}) {
  const commentsSummary = comments?.slice(0, isExpanded ? undefined : 2);
  const [activeCommentId, setActiveCommentId] = React.useState(undefined);
  const { setCommentFieldCommentId } = useDispatch('ig-posts');
  const { toggleCommentLike } = useDispatch('ig-posts');

  return (
    <section
      className={cx(styles.commentsSection, {
        [styles.isExpanded]: isExpanded,
      })}
    >
      {!isExpanded && (
        <div>
          <Link shallow href={`/p/${datum.post_id}`}>
            <a
              onClick={() => expandPost()}
              className={styles.viewCommentsButton}
            >
              View all comments
            </a>
          </Link>
        </div>
      )}
      {isExpanded && (
        <section
          className={cx(styles.postCaptionSection, {
            [styles.isExpanded]: isExpanded,
          })}
        >
          <Avatar user={datum} size="32" />
          <p className={styles.postCaptionText}>
            <span className={styles.commentUsername}>{datum?.user_name}</span>{' '}
            {datum?.post_caption}
          </p>
        </section>
      )}
      {commentsSummary?.map((comment) => {
        return (
          <div
            key={comment.comment_id}
            className={cx(styles.commentWrapper, {
              [styles.isExpanded]: isExpanded,
            })}
          >
            <div className={styles.commentBody}>
              {isExpanded && <Avatar user={comment} size="32" />}
              <p className={styles.commentText}>
                <span className={styles.commentUsername}>
                  {comment.user_name}
                </span>{' '}
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
                <div className={styles.commentActionContainer}>
                  <time className={styles.commentAction}>
                    {absoluteToRelativeDate(comment?.posted_on, 'mini')}
                  </time>
                  <button className={styles.commentAction}>
                    <strong>
                      {digitGrouping(comment.comment_likes)}
                      {comment.comment_likes > 0 ? ' likes' : ' like'}
                    </strong>
                  </button>
                  <button
                    onClick={() =>
                      setCommentFieldCommentId(postIndex, comment.comment_id)
                    }
                    className={styles.commentAction}
                  >
                    <strong>Reply</strong>
                  </button>

                  <button className={styles.threeDotsButton}>
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
              <div className={styles.viewRepliesSection}>
                <button
                  className={styles.viewRepliesButton}
                  onClick={() => {
                    setActiveCommentId(
                      activeCommentId === comment.comment_id
                        ? undefined
                        : comment.comment_id
                    );
                  }}
                >
                  <div className={styles.viewRepliesLine}></div>
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
        className={cx(styles.mediaSection, { [styles.isExpanded]: isExpanded })}
        style={{ maxWidth: isExpanded ? dimensions.width : 614 }}
      >
        <div
          className={styles.mediaContainer}
          style={{
            transform: `translateX(${(-mediaIndex * 100) / items.length}%)`,
            width: `${100 * items.length}%`,
          }}
        >
          {items?.map((mediaItem, index) =>
            mediaItem.type === 'photo' ? (
              index === 0 ? (
                <PostImage
                  key={index}
                  imageURL={mediaItem.url}
                  fraction={1 / items.length}
                  aspectRatio={aspectRatio}
                  setIsLoading={setIsLoading}
                  isLoading={isLoading}
                />
              ) : (
                <PostImage
                  key={index}
                  imageURL={mediaItem.url}
                  fraction={1 / items.length}
                  aspectRatio={aspectRatio}
                />
              )
            ) : index === 0 ? (
              <PostVideo
                key={index}
                videoURL={mediaItem.url}
                active={mediaIndex === index}
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
              />
            )
          )}
        </div>
        {items.length > 1 && !isLoading && (
          <div className={styles.imgButtonsContainer}>
            <button
              className={cx(styles.prevImgButton, { hidden: mediaIndex === 0 })}
              onClick={() => setMediaIndex(mediaIndex - 1)}
            >
              <CircularChevron
                maskKey={`post-previous-${post.post_id}`}
                size="24"
              />
            </button>
            <button
              className={cx(styles.nextImgButton, {
                hidden: mediaIndex === items.length - 1,
              })}
              onClick={() => setMediaIndex(mediaIndex + 1)}
            >
              <CircularChevron
                maskKey={`post-next-${post.post_id}`}
                size="24"
                direction="left"
              />
            </button>
          </div>
        )}
      </section>
      <section
        className={cx(styles.progressDotsSection, {
          [styles.isExpanded]: isExpanded,
        })}
      >
        {items.length > 1 && (
          <div className={styles.progressDots}>
            {items.map((_, index) => (
              <div
                key={index}
                className={cx(styles.progressDot, {
                  [styles.isActive]: index === mediaIndex,
                  [styles.isExpanded]: isExpanded,
                })}
              ></div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
export function Post({ isIndependentPost, datum, index, isFloating }) {
  const isExpanded = isIndependentPost;

  const setExpandedPost = useDispatch('ig-posts').setExpandedPost;

  const expandPost = React.useCallback(
    function expandPost() {
      setExpandedPost(datum.post_id);
    },
    [datum.post_id]
  );

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
  }, [datum, isFloating]);
  return (
    <article
      key={datum?.post_id}
      onClick={(event) => {
        if (event.target === event.currentTarget && isFloating) {
          setExpandedPost(undefined);
          history.go(-1);
        }
      }}
      className={cx(styles.postOverlay, {
        [styles.isFloating]: isFloating,
      })}
    >
      <div
        className={cx(styles.postContent, {
          [styles.isExpanded]: isExpanded,
          [styles.isFloating]: isFloating,
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
            key={`media-section-${datum.post_id}`}
            isExpanded={isExpanded}
            dimensions={dimensions}
            post={datum}
          />

          <PostActions
            index={index}
            is_post_liked={datum?.is_post_liked}
            isExpanded={isExpanded}
          />

          <section className={styles.likeCount}>
            Liked by <strong>{datum?.user_name}</strong> and
            <strong> {digitGrouping(datum?.likes_count)} others </strong>
          </section>
          {!isExpanded && (
            <section className={styles.postCaptionSection}>
              <p className={styles.postCaptionText}>
                <strong>{datum?.user_name}</strong> {datum?.post_caption}
              </p>
            </section>
          )}
          <CommentSection
            datum={datum}
            postIndex={index}
            expandPost={expandPost}
            comments={datum?.comments}
            isExpanded={isExpanded}
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