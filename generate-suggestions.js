const { writeFileSync } = require('fs');
const users = require('./public/Data/users.json');

const suggestions = users.map((user) => {
  const reasons = [
    'New to Instagram',
    `Followed by ${
      users[Math.floor(Math.random() * users.length)].user_name
    } + 2 more`,
    `Followed by ${users[Math.floor(Math.random() * users.length)].user_name}`,
  ];
  return {
    user_name: user.user_name,
    user_id: user.user_id,
    user_thumbnail: user.user_thumbnail,
    full_name: user.full_name,
    reason: reasons[Math.floor(Math.random() * reasons.length)],
  };
});

writeFileSync('./public/Data/suggestions.json', JSON.stringify(suggestions));
