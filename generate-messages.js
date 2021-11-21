const { v4 } = require('uuid');
const { writeFileSync } = require('fs');
const IGData = require('./public/Data/IG.json');
const users = IGData.map((data) => ({
  user_name: data.user_name,
  user_thumbnail: data.user_thumbnail,
  user_id: v4(),
}));
const messages = IGData.flatMap((d) => d.comments.map((c) => c.comment));

const conversations = users.map((user) => {
  const randomTS = Math.random() * 1637530131000;
  return {
    from_user_id: user.user_id,
    from_user_thumbnail: user.user_thumbnail,
    from_username: user.user_name,
    messages: messages
      .sort(() => Math.random() - 0.5)
      .slice(0, 20)
      .map((m, index) => {
        return {
          message_body: m,
          sent_on: new Date(randomTS + index * 100000).toISOString(),
          is_liked_by_user: Math.random() > 0.5,
          direction: Math.random() > 0.5 ? 'sent' : 'received',
        };
      }),
  };
});

writeFileSync('./public/Data/messages.json', JSON.stringify(conversations));
