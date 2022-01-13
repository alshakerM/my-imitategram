import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

import messagesData from '../../server/messages-data.json';
//const messagesDataPath = resolve(
// __dirname,
//('../../../../server/messages-data.json');
//);

//const messageString = readFileSync(messagesDataPath).toString();
//let messagesData = JSON.parse(messageString);

function syncMessageFile() {
  writeFileSync(messagesDataPath, JSON.stringify(messagesData));
}

const allowedFields = [
  'from_user_id',
  'from_username',
  'from_user_thumbnail',
  'messages',
  'last_message',
];

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { action } = req.query;
    const { index, fromUserId, like, text } = req.body;

    if (!fromUserId) {
      return res
        .status(400)
        .send('Bad request. fromUserId needs to be provided');
    }

    switch (action) {
      case 'messageLike': {
        const thread = messagesData.find(
          (thread) => thread.from_user_id === fromUserId
        );
        if (typeof index !== 'number') {
          return res
            .status(400)
            .send('Bad request. index needs to be a number');
        } else {
          const message = thread.messages[index];
          message.is_liked_by_user = like;
          syncMessageFile();
          return res.status(200).json({
            ok: true,
            message: `Message is now ${like ? 'liked' : 'unliked'}`,
          });
        }
      }
      case 'deleteMessage': {
        const thread = messagesData.find(
          (thread) => thread.from_user_id === fromUserId
        );
        if (typeof index !== 'number') {
          return res
            .status(400)
            .send('Bad request. index needs to be a number');
        } else {
          thread.messages.splice(index, 1);
          syncMessageFile();
          return res
            .status(200)
            .json({ ok: true, message: 'Message is now deleted' });
        }
      }
      case 'submitMessage': {
        const thread = messagesData.find(
          (thread) => thread.from_user_id === fromUserId
        );
        thread.messages.push({
          message_body: text,
          sent_on: new Date().toISOString(),
          is_liked_by_user: false,
          direction: 'sent',
        });
        syncMessageFile();
        return res
          .status(200)
          .json({ ok: true, message: 'Message is now Added' });
      }
      default: {
        return res.status(400).send(`Bad request. Bad action type`);
      }
    }
  } else {
    const { fields, fromUserId } = req.query;

    // <--- this part filters by field ---->
    let filteredThreads = messagesData.map((thread) => {
      // add last message to response, to make accessing the datetime of the last message and summary easier
      thread.last_message = thread.messages[thread.messages.length - 1];
      return thread;
    });

    if (fields) {
      const filteredFields = fields
        .split(',')
        .filter((field) => allowedFields.includes(field));

      if (filteredFields.length > 0) {
        filteredThreads = messagesData.map((thread) => {
          const filteredThread = {};

          filteredFields.forEach((key) => {
            filteredThread[key] = thread[key];
          });

          return filteredThread;
        });
      }
    }
    // <!--- done filtering by field ---->

    // <--- this part filters by fromUserId ---->
    if (!fromUserId) {
      return res.status(200).json(filteredThreads);
    } else {
      const thread = filteredThreads.find(
        (thread) => thread.from_user_id === fromUserId
      );
      if (!thread) {
        return res.status(400).send('Not found...');
      }
      return res.status(200).json(thread);
    }
    // <!--- end filter by fromUserId ---->
  }
}
