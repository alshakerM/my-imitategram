import messagesData from '../../server/messages-data.json';

const allowedFields = Object.keys(messagesData[0]);

export default function handler(req, res) {
  const { fields, fromUserId } = req.query;

  // <--- this part filters by field ---->
  let filteredThreads = messagesData;

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
