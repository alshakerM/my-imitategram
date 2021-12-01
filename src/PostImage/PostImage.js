import './PostImage.css';

export function PostImage({ imageURL }) {
  return (
    <img className="post-img" src={imageURL} alt="post image" loading="lazy" />
  );
}
