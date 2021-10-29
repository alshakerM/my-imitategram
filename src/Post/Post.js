import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import ShareIcon from "@mui/icons-material/Share";
import "./Post.css";

export function Post({ datum }) {
  return (
    <div className="content">
      <div className="card-container">
        <div sx={{ maxWidth: 614, minHeight: 939.2 }} id="card">
          <div className="card-header">
            <img src={datum.user_thumbnail} className="user-avatar" />
            <div className="user-info">
              <h2 className="user-name">{datum.user_name}</h2>
              <p className="user-location">{datum.city}</p>
            </div>
            <MoreHoriz className="more-icon" />
          </div>
          <div>
            <img className="post-img" src={datum.post_image} alt="" />
          </div>
          <div disableSpacing>
            {datum.is_post_liked ? (
              <FavoriteIcon style={{ color: "red", margin: "0 2%" }} />
            ) : (
              <FavoriteIcon style={{ margin: "0 2%" }} />
            )}
            <ShareIcon />
          </div>
          <div className="post-caption-section">
            <p className="like-count">{datum.likes_count} likes</p>
            <p>{datum.post_caption}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
