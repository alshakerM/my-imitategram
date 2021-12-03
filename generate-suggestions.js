const { writeFileSync } = require('fs');
const IGData = require('./public/Data/IG-v2.json');
const users = IGData.map((data) => ({
  user_name: data.user_name,
  user_thumbnail: data.user_thumbnail,
  user_id: data.user_id,
}));

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
    reason: reasons[Math.floor(Math.random() * reasons.length)],
  };
});

writeFileSync('./public/Data/suggestions.json', JSON.stringify(suggestions));
