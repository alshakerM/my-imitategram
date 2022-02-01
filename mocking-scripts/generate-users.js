const { writeFileSync } = require('fs');
const messagesData = require('../server/messages-data.json');
const userData = require('../server/profile-data.json');
function getUserIdByUsername(username) {
  return userData.find((u) => u.user_name === username).user_id;
}

const newMessages = messagesData.map((m) => {
  return { ...m, from_user_id: getUserIdByUsername(m.from_username) };
});

writeFileSync('../server/messages-dataV2.json', JSON.stringify(newMessages));
