import styles from './PostImage.module.css';

export function PostImage({ imageURL, fraction }) {
  return (
    <img
      className={styles.postImg}
      src={imageURL}
      alt="post"
      loading="lazy"
      width={`${fraction * 100}%`}
    />
  );
}
