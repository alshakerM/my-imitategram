const { writeFileSync } = require('fs');
const IGData = require('./public/Data/IG.json');
const photos = [
  {
    type: 'photo',
    url: 'https://picsum.photos/1000',
    width: 1000,
    height: 1000,
  },
  {
    type: 'photo',
    url: 'https://picsum.photos/1010',
    width: 1010,
    height: 1010,
  },
  {
    type: 'photo',
    url: 'https://picsum.photos/1020',
    width: 1020,
    height: 1020,
  },
  {
    type: 'photo',
    url: 'https://picsum.photos/1030',
    width: 1030,
    height: 1030,
  },
  {
    type: 'photo',
    url: 'https://picsum.photos/1040',
    width: 1040,
    height: 1040,
  },
  {
    type: 'photo',
    url: 'https://picsum.photos/1050',
    width: 1050,
    height: 1050,
  },
  {
    type: 'video',
    url: '/Media/postVideos/1.mp4',
    width: 640,
    height: 800,
  },
  {
    type: 'video',
    url: '/Media/postVideos/2.mp4',
    width: 640,
    height: 800,
  },
  {
    type: 'video',
    url: '/Media/postVideos/3.mp4',
    width: 640,
    height: 800,
  },
  {
    type: 'video',
    url: '/Media/postVideos/4.mp4',
    width: 720,
    height: 1280,
  },
  {
    type: 'video',
    url: '/Media/postVideos/5.mp4',
    width: 720,
    height: 1280,
  },
  {
    type: 'video',
    url: '/Media/postVideos/6.mp4',
    width: 640,
    height: 1138,
  },
  {
    type: 'video',
    url: '/Media/postVideos/7.mp4',
    width: 640,
    height: 360,
  },
];
const newData = IGData.map((post, index) => {
  delete post.post_image;
  post.media_items = photos
    .sort(() => Math.random() - 0.5)
    .slice(0, (index % 5) + 1);
  return post;
});

writeFileSync('./public/Data/IG-v2.json', JSON.stringify(newData));
