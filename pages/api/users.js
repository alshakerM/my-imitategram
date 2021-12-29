import profileData from '../../server/profile-data.json';

export default function handler(req, res) {
  const { userId, postType } = req.query;
  if (userId) {
    const fullUser = profileData.find((u) => u.user_name === userId);
    if (postType === 'tagged') {
      const { posts, ...user } = fullUser;
      user.posts = user.taggedPosts;
      delete user.taggedPosts;
      return res.status(200).json(user);
    } else if (postType === 'posts') {
      const { taggedPosts, ...user } = fullUser;
      return res.status(200).json(user);
    }
  } else {
    res.status(404).send('Not found.');
  }
}
