import styles from './PostImage.module.css';

export function PostImage({ imageURL ,height, width }) {
  return (
    <img className={styles.postImg} src={imageURL} alt="post" loading="lazy" height={height} width={width}/>
  );
}
