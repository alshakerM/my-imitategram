import profileData from '../../server/profile-data.json';

export default function handler(req, res) {
  const { userName } = req.query;
  if (userName) {
    const user = profileData.find((u) => u.user_name === userName);
    if (user) {
      res.status(200).json([user]);
    } else {
      res.status(404).send('Not found.');
    }
  }
}
