import posts from '../../server/posts-data.json';

export default function handler(req, res) {
  const { postId, pageNumber } = req.query;
  if (postId) {
    const post = posts.find((p) => p.post_id === postId);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).send('Not found.');
    }
  } else {
    if (pageNumber < posts.length) {
      const newPosts = posts.slice(0, pageNumber);
      res.status(200).json(newPosts);
    }
    res.status(200).json(posts);
  }
}
