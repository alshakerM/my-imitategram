import styles from './PostImage.module.css';

export function PostImage({ imageURL }) {
  return (
    <img className={styles.postImg} src={imageURL} alt="post image" loading="lazy" />
  );
}
