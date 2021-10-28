import React from "react";
import "./App.css";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import data from "./Data/MOCK_DATA.json";

function App() {
  return (
    <div className="content-section">
      {data.map((datum) => (
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

              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  {datum.is_post_liked ? (
                    <FavoriteIcon style={{ color: "red" }} />
                  ) : (
                    <FavoriteIcon />
                  )}
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
              </CardActions>
              <CardContent>
                <Typography
                  variant="body2"
                  color="text.primary"
                  sx={{ width: 614, maxHeight: 17.6 }}
                  style={{ marginBottom: "2%" }}
                >
                  {datum.likes_count} likes
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {datum.post_caption}
                </Typography>
              </CardContent>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
