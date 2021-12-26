import profileData from '../../server/profile-data.json';

export default function handler(req, res) {
  const { userId } = req.query;
  if (userId) {
    const user = profileData.find((u) => u.user_name === userId);
    if (user) {
      res.status(200).json([user]);
    } else {
      res.status(404).send('Not found.');
    }
  }
}
