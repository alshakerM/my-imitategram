import storiesData from '../../server/stories-data.json';

export default function handler(req, res) {
  const { userId } = req.query;
  if (userId) {
    const userStories = storiesData.find((s) => s.user_id === userId);
    if (userStories) {
      res.status(200).json([userStories]);
    } else {
      res.status(404).send('Not found.');
    }
  } else {
    res.status(200).json(storiesData);
  }
}
