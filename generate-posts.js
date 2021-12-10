const { writeFileSync } = require('fs');
const IGData = require('./public/Data/IG-v2.json');
const fs = require('fs');
const imageSize = require('image-size');

function getItems(index) {
  const filesArray = fs
    .readdirSync(`./public/Media/posts/${index}`)
    .filter((n) => !n.startsWith('.'));
  const size = imageSize(
    `./public/Media/posts/${index}/${filesArray.find((f) =>
      f.endsWith('.jpg')
    )}`
  );
  delete size.type;
  return {
    size,
    items: filesArray.map((file) => ({
      type: file.endsWith('jpg') ? 'photo' : 'video',
      url: `/Media/posts/${index}/${file}`,
    })),
  };
}

const newData = IGData.map((post, index) => {
  const { size, items } = getItems((index % 9) + 1);
  post.media_items = items;
  post.media_dimensions = size;
  return post;
});

writeFileSync('./public/Data/IG-v3.json', JSON.stringify(newData));
