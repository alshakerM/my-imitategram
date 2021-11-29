import { Check, Person, PhotoCameraFrontOutlined } from '@mui/icons-material';
import cx from 'classnames';
import React from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { NavBar } from '../NavBar/NavBar';
import styles from './UserProfile.module.css';
import { Avatar } from '../Avatar/Avatar';

function UserProfilePost({ post }) {
  return (
    <Link to={`/p/${post.post_id}`} className={styles.postContainer}>
      <img
        src={post.post_image}
        alt={post.user_name}
        className={styles.postImg}
      />
      <div className={styles.postHover}>
        <div className={styles.likeIconCount}>
          <svg
            aria-label="like-icon"
            className={styles.Icon}
            height="19"
            role="img"
            viewBox="0 0 48 48"
            width="19"
          >
            <path
              className={styles.Icon}
              d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"
            ></path>
          </svg>
          <p> {post.likes_count}</p>
        </div>
        <div className={styles.likeIconCount}>
          <svg
            aria-label="Comment"
            height="19"
            role="img"
            viewBox="0 0 48 48"
            width="19"
          >
            <ellipse cx="24" cy="24" rx="24" ry="21" fill="white" />
            <path d="M10 30, 40 20, 48 48" fill="white" />
          </svg>
          <p> {post.comment_count}</p>
        </div>
      </div>
    </Link>
  );
}
export function UserProfile({ userName }) {
  const [usersData, setUsersData] = React.useState([]);
  const location = useLocation();
  const user = usersData?.find((element) => element.user_name === userName);
  React.useEffect(() => {
    fetch('/Data/users.json', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((results) => setUsersData(results));
  }, []);

  const postsToRender =
    (location.pathname.includes('tagged') ? user?.taggedPosts : user?.posts) ||
    [];

  return (
    <>
      <NavBar />
      <div className={styles.profilePage}>
        <div className={styles.header}>
          <div className={styles.imgContainer}>
            <Link to={`/stories/${user?.user_id}`}>
              <Avatar
                src={user?.user_thumbnail}
                alt={`${user?.user_name} avatar`}
                size="150px"
                borderColor="#ddd"
              />
            </Link>
          </div>
          <div>
            <div className={styles.userInfoAndButtons}>
              <p className={styles.userName}>{user?.user_name}</p>
              <div className={styles.buttonsContainer}>
                <button className={styles.messageButton}>
                  <strong>Message</strong>
                </button>
                <button className={styles.followButton}>
                  <Person
                    style={{ padding: '0', margin: 0 }}
                    fontSize="small"
                  />
                  <Check fontSize="small" className={styles.checkIcon} />
                </button>

                <button className={styles.showMore}>
                  <svg
                    aria-label="Down Chevron Icon"
                    className={styles.DownIcon}
                    fill="#262626"
                    height="12"
                    role="img"
                    viewBox="0 0 48 48"
                    width="12"
                  >
                    <path d="M40 33.5c-.4 0-.8-.1-1.1-.4L24 18.1l-14.9 15c-.6.6-1.5.6-2.1 0s-.6-1.5 0-2.1l16-16c.6-.6 1.5-.6 2.1 0l16 16c.6.6.6 1.5 0 2.1-.3.3-.7.4-1.1.4z"></path>
                  </svg>
                </button>
                <button className={styles.threeDotsButton}>
                  <svg
                    aria-label="Options"
                    fill="#262626"
                    height="32"
                    role="img"
                    viewBox="0 0 24 24"
                    width="32"
                  >
                    <circle cx="12" cy="12" r="1.5"></circle>
                    <circle cx="6.5" cy="12" r="1.5"></circle>
                    <circle cx="17.5" cy="12" r="1.5"></circle>
                  </svg>
                </button>
              </div>
            </div>
            <div className={styles.postInfo}>
              <p className={styles.postCount}>
                <strong>{user?.postCount}</strong>{' '}
                {user?.postCount > 1 ? 'posts' : 'post'}
              </p>
              <p className={styles.count}>
                <strong>{user?.followers}</strong>{' '}
                {user?.followers > 1 ? 'followers' : 'follower'}
              </p>
              <p className={styles.count}>
                <strong>{user?.following}</strong> following
              </p>
            </div>
            <div className={styles.userInfoAndBio}>
              <p className={styles.userInfo}>
                <strong>{user?.full_name}</strong>
              </p>
              <p className={styles.userInfo}>{user?.bio}</p>
              <p className={styles.userInfo}>📍 Baghdad, Iraq.</p>
            </div>
          </div>
        </div>
        <div className={styles.postVideosTagged}>
          <Link
            to={`/${user?.user_name}`}
            className={cx(styles.link, {
              [styles.isSelected]: location.pathname === `/${user?.user_name}`,
            })}
          >
            <svg
              aria-label=""
              fill={
                location.pathname === `/${user?.user_name}`
                  ? '#262626'
                  : '#8e8e8e'
              }
              height="12"
              role="img"
              viewBox="0 0 48 48"
              width="12"
            >
              <path
                clip-rule="evenodd"
                d="M45 1.5H3c-.8 0-1.5.7-1.5 1.5v42c0 .8.7 1.5 1.5 1.5h42c.8 0 1.5-.7 1.5-1.5V3c0-.8-.7-1.5-1.5-1.5zm-40.5 3h11v11h-11v-11zm0 14h11v11h-11v-11zm11 25h-11v-11h11v11zm14 0h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11zm14 28h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11z"
                fill-rule="evenodd"
              ></path>
            </svg>
            POSTS
          </Link>
          <Link
            to={`/${user?.user_name}/channel/`}
            className={cx(styles.link, {
              [styles.isSelected]:
                location.pathname === `/${user?.user_name}/channel/`,
            })}
          >
            <svg
              aria-label=""
              fill={
                location.pathname === `/${user?.user_name}/channel/`
                  ? '#262626'
                  : '#8e8e8e'
              }
              height="12"
              role="img"
              viewBox="0 0 24 24"
              width="12"
            >
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 22.5C6.2 22.5 1.5 17.8 1.5 12S6.2 1.5 12 1.5 22.5 6.2 22.5 12 17.8 22.5 12 22.5zm5-11.8l-6.8-3.9c-.5-.3-1-.3-1.5 0-.4.3-.7.7-.7 1.3v7.8c0 .5.3 1 .8 1.3.2.1.5.2.8.2s.5-.1.8-.2l6.8-3.9c.5-.3.8-.8.8-1.3s-.5-1-1-1.3zm-7.5 5.2V8.1l6.8 3.9-6.8 3.9z"></path>
            </svg>
            VIDEOS
          </Link>
          <Link
            to={`/${user?.user_name}/tagged/`}
            className={cx(styles.link, {
              [styles.isSelected]:
                location.pathname === `/${user?.user_name}/tagged/`,
            })}
          >
            <svg
              fill={
                location.pathname === `/${user?.user_name}/tagged/`
                  ? '#262626'
                  : '#8e8e8e'
              }
              height="12"
              role="img"
              viewBox="0 0 48 48"
              width="12"
            >
              <path d="M41.5 5.5H30.4c-.5 0-1-.2-1.4-.6l-4-4c-.6-.6-1.5-.6-2.1 0l-4 4c-.4.4-.9.6-1.4.6h-11c-3.3 0-6 2.7-6 6v30c0 3.3 2.7 6 6 6h35c3.3 0 6-2.7 6-6v-30c0-3.3-2.7-6-6-6zm-29.4 39c-.6 0-1.1-.6-1-1.2.7-3.2 3.5-5.6 6.8-5.6h12c3.4 0 6.2 2.4 6.8 5.6.1.6-.4 1.2-1 1.2H12.1zm32.4-3c0 1.7-1.3 3-3 3h-.6c-.5 0-.9-.4-1-.9-.6-5-4.8-8.9-9.9-8.9H18c-5.1 0-9.4 3.9-9.9 8.9-.1.5-.5.9-1 .9h-.6c-1.7 0-3-1.3-3-3v-30c0-1.7 1.3-3 3-3h11.1c1.3 0 2.6-.5 3.5-1.5L24 4.1 26.9 7c.9.9 2.2 1.5 3.5 1.5h11.1c1.7 0 3 1.3 3 3v30zM24 12.5c-5.3 0-9.6 4.3-9.6 9.6s4.3 9.6 9.6 9.6 9.6-4.3 9.6-9.6-4.3-9.6-9.6-9.6zm0 16.1c-3.6 0-6.6-2.9-6.6-6.6 0-3.6 2.9-6.6 6.6-6.6s6.6 2.9 6.6 6.6c0 3.6-3 6.6-6.6 6.6z"></path>
            </svg>
            TAGGED
          </Link>
        </div>

        <div className={styles.postsSection}>
          {postsToRender.map((post) => (
            <UserProfilePost post={post} location={location} user={user} />
          ))}
        </div>
        <div hidden={postsToRender.length > 0}>
          <div className={styles.emptyTaggedSection}>
            <div className={styles.iconSection}>
              <PhotoCameraFrontOutlined className={styles.profileIcon} />
            </div>
            <p className={styles.noPhotos}>No photos</p>
          </div>
        </div>
      </div>
    </>
  );
}
