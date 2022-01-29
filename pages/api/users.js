import profileData from '../../server/profile-data.json';

const allowedFields = [
  'user_name',
  'user_thumbnail',
  'full_name',
  'user_has_story',
  'user_id',
];
let filteredProfiles;

export default function handler(req, res) {
  const { userId, postType, fields } = req.query;

  if (fields) {
    const filteredFields = fields
      .split(',')
      .filter((field) => allowedFields.includes(field));

    if (filteredFields.length > 0) {
      filteredProfiles = profileData.map((profile) => {
        const filteredProfile = {};

        filteredFields.forEach((key) => {
          filteredProfile[key] = profile[key];
        });

        return filteredProfile;
      });
    }
  }

  if (userId) {
    const fullUser = profileData.find((u) => u.user_name === userId);
    if (postType === 'tagged') {
      // eslint-disable-next-line no-unused-vars
      const { posts, ...user } = fullUser;
      user.posts = user.taggedPosts;
      delete user.taggedPosts;
      return res.status(200).json(user);
    } else if (postType === 'posts') {
      // eslint-disable-next-line no-unused-vars
      const { taggedPosts, ...user } = fullUser;
      return res.status(200).json(user);
    }
  } else {
    res.status(200).json(filteredProfiles);
  }
}
