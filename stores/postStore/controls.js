import { isomorphicFetch } from "../../utils";

export async function REQUEST_POSTS(action) {
  const { postId, pageNumber } = action;
  let response;
  if (postId) {
    response = await isomorphicFetch(`/api/posts?postId=${postId}`);
  } else {
    response = await isomorphicFetch('/api/posts');
  }
  if (pageNumber >= 0) {
    response = await isomorphicFetch(`/api/posts?pageNumber=${pageNumber}`);
  }
  const results = await response.json();
  return results;
}
export async function POST_LIKE(action) {
  await isomorphicFetch('/api/posts?action=postLike', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      postId: action.postId,
      like: action.like,
    }),
  });
}
export async function TOGGLE_COMMENT_LIKE(action) {
  await isomorphicFetch('/api/posts?action=toggleCommentLike', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      postId: action.postId,
      commentId: action.commentId,
    }),
  });
}
export async function TOGGLE_REPLY_LIKE(action) {
  await isomorphicFetch('/api/posts?action=toggleReplyLike', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      postId: action.postId,
      commentId: action.commentId,
      replyId: action.replyId,
    }),
  });
}
export async function SUBMIT_POST_COMMENT(action) {
  await isomorphicFetch('/api/posts?action=submitPostComment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      postId: action.postId,
      text: action.text,
    }),
  });
}
