const { writeFileSync } = require('fs');
const IGData = require('../public/Data/IG-v4.json');
const users = require('../public/Data/users.json');

let index = 0;
const newData = IGData.flatMap((post) => {
  return {
    ...post,
    comments: post.comments.map((comment) => {
      const user = users[++index % users.length];

      return {
        ...comment,
        user_thumbnail: user.user_thumbnail,
        user_name: user.user_name,
        replies: comment.replies.map((reply) => {
          const user = users[++index % users.length];

          return {
            ...reply,
            user_thumbnail: user.user_thumbnail,
            user_name: user.user_name,
          };
        }),
      };
    }),
  };
});

writeFileSync('../public/Data/IG-v4.json', JSON.stringify(newData));
