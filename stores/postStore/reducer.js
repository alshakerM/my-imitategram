import produce from 'immer';
import { v4 } from 'uuid';
import { LOGGED_IN_USER } from '../constants';

const defaultState = {
  posts: [],
  isLoading: false,
  commentFieldText: '',
  commentFieldCommentId: null,
  commentFieldPostIndex: null,
  isExpanded: false,
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case 'TOGGLE_POST_LIKE': {
      return produce(state, (draft) => {
        const post = draft.posts[action.postIndex];
        post.is_post_liked = !post.is_post_liked;
      });
    }
    case 'SET_LOADING': {
      const newState = { ...state, posts: [...state.posts] };
      newState.isLoading = action.isLoading;
      return newState;
    }
    case 'SET_EXPANDED_POST': {
        const newState = { ...state };
        newState.expandedPostId = action.postId;
        return newState;
      }
    case 'RECEIVE_POSTS': {
      return { ...state, posts: action.posts };
    }
    case 'TOGGLE_COMMENT_LIKE': {
      return produce(state, (draft) => {
        const post = draft.posts[action.postIndex];
        const comment = post.comments.find(
          (comment) => comment.comment_id === action.commentId
        );
        comment.is_liked_by_user = !comment.is_liked_by_user;
      });
    }
    case 'TOGGLE_REPLY_LIKE': {
      return produce(state, (draft) => {
        const comment = draft.posts[action.postIndex].comments.find(
          (el) => el.comment_id === action.commentId
        );
        const reply = comment.replies.find(
          (el) => el.comment_id === action.replyId
        );
        reply.is_liked_by_user = !reply.is_liked_by_user;
      });
    }
    case 'SUBMIT_POST_COMMENT': {
      if (state.commentFieldCommentId) {
        return produce(state, (draft) => {
          const comment = draft.posts[
            draft.commentFieldPostIndex
          ].comments.find(
            (el) => el.comment_id === draft.commentFieldCommentId
          );
          comment.replies.push({
            comment_id: v4(),
            user_name: LOGGED_IN_USER,
            comment: draft.commentFieldText,
            comment_likes: 0,
            is_liked_by_user: false,
            user_thumbnail:
              'https://robohash.org/velitillosimilique.png?size=64x64&set=set1',
            posted_on: new Date().toISOString(),
          });
          draft.commentFieldCommentId = null;
          draft.commentFieldText = '';
        });
      } else {
        return produce(state, (draft) => {
          draft.posts[action.postIndex].comments.push({
            comment_id: v4(),
            user_name: LOGGED_IN_USER,
            comment: draft.commentFieldText,
            comment_likes: 0,
            is_liked_by_user: false,
            user_thumbnail:
              'https://robohash.org/velitillosimilique.png?size=64x64&set=set1',
            posted_on: new Date().toISOString(),
            replies: [],
          });
          draft.commentFieldText = '';
        });
      }
    }
    case 'SET_COMMENT_FIELD_TEXT': {
      const newState = { ...state };
      newState.commentFieldText = action.text;
      return newState;
    }
    case 'SET_COMMENT_FIELD_COMMENT_ID': {
      const newState = { ...state };
      const comment = newState.posts[action.postIndex].comments.find(
        (el) => el.comment_id === action.commentId
      );
      const userName = comment.user_name;
      newState.commentFieldText = `@${userName} `;
      newState.commentFieldCommentId = action.commentId;
      newState.commentFieldPostIndex = action.postIndex;
      return newState;
    }
    default:
      return state;
  }
}
