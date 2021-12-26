import posts from '../../server/posts-data.json';

export default function handler(req, res) {
  const { postId } = req.query;
  if (postId) {
    const post = posts.find((p) => p.post_id === postId);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).send("Not found.");
    }
  } else {
    res.status(200).json(posts);
  }
}
