import styles from './PostImage.module.css';
import cx from 'classnames';

export function PostImage({
  imageURL,
  fraction,
  aspectRatio,
  isLoading,
  setIsLoading,
}) {
  return (
    <img
      className={cx(styles.postImg, {
        [styles.isLoading]: isLoading,
      })}
      src={imageURL}
      alt="post"
      loading="lazy"
      width={`${fraction * 100}%`}
      style={{ aspectRatio }}
      onLoad={() => setIsLoading?.(false)}
    />
  );
}
