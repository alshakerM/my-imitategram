const { writeFileSync } = require('fs');
const IGData = require('../public/Data/IG-v4.json');
const users = IGData.map((data) => ({
  user_name: data.user_name,
  user_thumbnail: data.user_thumbnail,
  user_id: data.user_id,
  user_has_story: data.poster_has_story,
})).filter((u, _, arr) => !arr.filter((user) => user.user_name === u.user_name).length < 2);

const messages = IGData.flatMap((d) => d.comments.map((c) => c.comment));
const fullNames = [
  { full_name: 'Odille Whanstall' },
  { full_name: 'Carmencita Daal' },
  { full_name: 'Wade Crady' },
  { full_name: 'Wyndham Leupoldt' },
  { full_name: 'Ali Ager' },
  { full_name: 'Cally Keddie' },
  { full_name: 'Albertina Ulyatt' },
  { full_name: 'Cherice Andreix' },
  { full_name: 'Branden Sawforde' },
  { full_name: 'Darci Flarity' },
  { full_name: 'Gran Norvel' },
  { full_name: 'Woodman Dyson' },
  { full_name: 'Tabbie Fanton' },
  { full_name: 'Alwyn Heephy' },
  { full_name: 'Gal Battershall' },
  { full_name: 'Agnes Hadfield' },
  { full_name: 'Earl de Verson' },
  { full_name: 'Melania Cowp' },
  { full_name: 'Esme Nossent' },
  { full_name: 'Shay Wildes' },
];

const conversations = users.map((user, index) => {
  const followers = Math.floor(0 + Math.random() * 5000000);
  const following = Math.floor(0 + Math.random() * 50000);
  const posts = IGData.filter((post) => post.user_name === user.user_name).map(
    (post) => ({
      post_image: post.media_items[0].url,
      likes_count: post.likes_count,
      comment_count: post.comments.length,
      post_id: post.post_id,
    })
  );
  return {
    ...user,
    full_name: fullNames[index % fullNames.length].full_name,
    followers,
    following,
    bio: messages[index],
    postCount: posts.length,
    posts,
    taggedPosts: IGData.filter((post) => post.user_name !== user.user_name)
      .map((post) => ({
        post_image: post.media_items[0].url,
        likes_count: post.likes_count,
        comment_count: post.comments.length,
        post_id: post.post_id,
      }))
      .slice(0, 10),
  };
});

writeFileSync('../public/Data/users.json', JSON.stringify(conversations));
