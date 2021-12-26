import messagesData from '../../server/messages-data.json';

export default function handler(res) {
  res.status(200).json(messagesData);
}
