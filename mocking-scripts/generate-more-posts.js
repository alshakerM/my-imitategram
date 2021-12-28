const { writeFileSync } = require('fs');
let IGData = require('./public/Data/IG-v4.json');
const { v4 } = require('uuid');

const result = [];
IGData.forEach((post, index) => {
  result.push(post);
  for (let i = 1; i < 6; i++) {
    const nextPost = { ...IGData[(index + i) % IGData.length] };
    nextPost.post_id = v4();
    nextPost.user_thumbnail = post.user_thumbnail;
    nextPost.user_name = post.user_name;
    nextPost.poster_has_story = post.poster_has_story;
    nextPost.user_id = post.user_id;

    result.push(nextPost);
  }
});

result.sort(() => Math.random() - 0.5);

writeFileSync('./public/Data/IG-v4.json', JSON.stringify(result));
