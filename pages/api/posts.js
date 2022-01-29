import { v4 } from 'uuid';
import { LOGGED_IN_USER } from '../../stores/constants';

import posts from '../../server/posts-data.json';

//const postString = readFileSync(postsDataPath).toString();
//let posts = JSON.parse(postString);

function syncPostFile() {
  // writeFileSync(postsDataPath, JSON.stringify(posts));
}

const PAGE_SIZE = 20;

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { action } = req.query;
    const { postId, like, commentId, text, replyId } = req.body;

    if (!postId) {
      return res.status(400).send('Bad request. postId needs to be provided');
    }

    switch (action) {
      case 'postLike': {
        const post = posts.find((p) => p.post_id === postId);
        post.is_post_liked = like;
        syncPostFile();
        return res.status(200).json({
          ok: true,
          message: `post is now ${post.is_post_liked ? 'liked' : 'unliked'}`,
        });
      }
      case 'toggleCommentLike': {
        const post = posts.find((p) => p.post_id === postId);
        const comment = post.comments.find(
          (comment) => comment.comment_id === commentId
        );
        comment.is_liked_by_user = !comment.is_liked_by_user;
        syncPostFile();
        return res.status(200).json({
          ok: true,
          message: `comment is now ${
            comment.is_liked_by_user ? 'liked' : 'unliked'
          }`,
        });
      }
      case 'toggleReplyLike': {
        const post = posts.find((p) => p.post_id === postId);
        const comment = post.comments.find(
          (comment) => comment.comment_id === commentId
        );
        const reply = comment.replies.find(
          (reply) => reply.comment_id === replyId
        );

        reply.is_liked_by_user = !reply.is_liked_by_user;
        syncPostFile();
        return res.status(200).json({
          ok: true,
          message: `reply is now ${
            reply.is_liked_by_user ? 'liked' : 'unliked'
          }`,
        });
      }
      case 'submitPostComment': {
        const post = posts.find((p) => p.post_id === postId);
        post.comments.push({
          comment_id: v4(),
          user_name: LOGGED_IN_USER,
          comment: text,
          comment_likes: 0,
          is_liked_by_user: false,
          user_thumbnail: '/my-suit-pic.jpg',
          posted_on: new Date().toISOString(),
          replies: [],
        });
        syncPostFile();
        return res.status(200).json({
          ok: true,
          message: `comment is now added`,
        });
      }
    }
  } else {
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
}
