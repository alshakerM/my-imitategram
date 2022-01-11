import styles from './PostImage.module.css';
import cx from 'classnames';
import React from 'react';
import Image from 'next/image';

const useElementOnScreen = (options) => {
  const imgRef = React.useRef(null);
  const [isVisible, setIsVisible] = React.useState(false);
  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting !== isVisible) {
        setIsVisible(entry.isIntersecting);
      }
    }, options);
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    return () => {
      if (imgRef.current && isVisible) {
        observer.disconnect(imgRef.current);
      }
    };
  }, [imgRef, options]);

  return [imgRef, isVisible];
};

export function PostImage({
  imageURL,
  fraction,
  aspectRatio,
  isLoading,
  setIsLoading,
  onDoubleClick,
  tags,
  postDimensions,
  isActive,
}) {
  const [isImgDoubleClicked, setIsImgDoubleCLicked] = React.useState(false);
  const [isImgClicked, setIsImgCLicked] = React.useState(false);
  const [imgRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 0,
  });

  React.useEffect(() => {
    if (!isActive) {
      setIsImgCLicked(false);
    }
  }, [isActive]);

  return (
    <div
      onDoubleClick={() => {
        setIsImgDoubleCLicked(true);
        setTimeout(setIsImgDoubleCLicked, 1500, false);
      }}
      width={`${fraction * 100}%`}
      className={cx(styles.imgContainer, {
        [styles.isLoading]: isLoading,
      })}
      style={{ aspectRatio, width: `${fraction * 100}%` }}
    >
      <Image
        className={cx(styles.postImg, {
          [styles.isLoading]: isLoading,
        })}
        ref={imgRef}
        src={imageURL}
        alt="post"
        onLoad={() => setIsLoading?.(false)}
        onDoubleClick={onDoubleClick}
        onClick={() => {
          setIsImgCLicked(!isImgClicked);
        }}
        width={postDimensions.width}
        height={postDimensions.height}        
      />
      {isImgDoubleClicked && (
        <div className={styles.likeIconContainer}>
          <svg
            className={styles.likeIcon}
            aria-label="Unlike"
            fill="white"
            height="90"
            role="img"
            viewBox="0 0 48 48"
            width="90"
          >
            <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
          </svg>
        </div>
      )}
      {tags?.map((tag) => {
        const taggedX = (tag.coordinates.x / postDimensions.width) * 100;
        // we subtract 50% because the parent already centers its children vertically
        const taggedY = (tag.coordinates.y / postDimensions.height) * 100 - 50;

        return (
          <>
            {isImgClicked && (
              <div
                className={styles.tooltip}
                style={{ marginTop: `${taggedY}%`, marginLeft: `${taggedX}%` }}
                open={isImgClicked && isActive}
              >
                <div className={styles.taggedContent}>
                  <div className={styles.emptyArrow}>
                    <div className={styles.arrow}></div>
                  </div>
                  <p className={styles.taggedUserName}>
                    <a
                      className={styles.taggedUserLink}
                      href={`/${tag.tagged_user_name}`}
                    >
                      {tag.tagged_user_name}
                    </a>
                  </p>
                </div>
              </div>
            )}
          </>
        );
      })}
      {tags && (
        <div
          className={cx(styles.tagIconContainer, {
            [styles.isVisible]: isVisible,
            [styles.isClicked]: isImgClicked,
          })}
        >
          <svg
            aria-label="Tags"
            className={styles.tagIcon}
            color="#ffffff"
            fill="#ffffff"
            height="12"
            role="img"
            viewBox="0 0 24 24"
            width="12"
          >
            <path d="M21.334 23H2.666a1 1 0 01-1-1v-1.354a6.279 6.279 0 016.272-6.272h8.124a6.279 6.279 0 016.271 6.271V22a1 1 0 01-1 1zM12 13.269a6 6 0 116-6 6.007 6.007 0 01-6 6z"></path>
          </svg>
        </div>
      )}
    </div>
  );
}
