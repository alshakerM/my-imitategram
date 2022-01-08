const { writeFileSync } = require('fs');
let posts = require('../server/posts-data.json');
let users = require('../server/profile-data.json');

function getRandomUser() {
  return users[Math.floor(Math.random() * (users.length - 1))];
}

posts = posts.map((post, index) => {
  if (index % 3 === 0) {
    post.media_items
      .filter((item) => item.type === 'photo')
      .map((photo) => {
        photo.tags = [
          {
            coordinates: {
              x: 200 + Math.floor(Math.random() * 400),
              y: 200 + Math.floor(Math.random() * 400),
            },
            tagged_user_name: getRandomUser().user_name,
          },
        ];
        return photo;
      });
    post.post_has_tags = true;
  }
  post.post_has_tags = false;
  return post;
});

writeFileSync('../server/posts-data.json', JSON.stringify(posts));
