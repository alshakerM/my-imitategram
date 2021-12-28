const { writeFileSync } = require('fs');
const IGData = require('../public/Data/IG-v4.json');
const { v4 } = require('uuid');

const cache = {};
let index = 0;
const newData = IGData.flatMap((post) => {
  return {
    ...post,
    comments: post.comments.map((comment) => {
      if (!cache[comment.user_name]) {
        cache[comment.user_name] = `/avatars/${++index % 40}.jpg`;
      }

      return {
        ...comment,
        user_thumbnail: cache[comment.user_name],
        replies: comment.replies.map((reply) => {
          if (!cache[reply.user_name]) {
            cache[reply.user_name] = `/avatars/${++index % 40}.jpg`;
          }

          return { ...reply, user_thumbnail: cache[reply.user_name] };
        }),
      };
    }),
  };
});

writeFileSync('../public/Data/IG-v4.json', JSON.stringify(newData));
