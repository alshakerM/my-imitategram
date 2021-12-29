import posts from '../../server/posts-data.json';

const PAGE_SIZE = 20;

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
    const start = pageNumber * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const response = {
      posts: posts.slice(start, end),
      start,
      end,
      itemsLeft: Math.max(0, posts.length - end),
    };
    return res.status(200).json(response);
  }
}
