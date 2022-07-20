const ig = require('instagram-node').instagram();
const format = require('date-fns/format');

function formatDate(timestamp) {
  const d = new Date(0);
  const date = new Date(d.setUTCSeconds(timestamp));

  return format(new Date(date), 'do LLL yy');
}

function mapPhoto(photo) {
  return {
    images: photo.images,
    created_time: photo.created_time,
    created_time_formatted: formatDate(photo.created_time),
    caption: photo.caption,
    comments: photo.comments,
    likes: photo.likes,
    filter: photo.filter,
    link: photo.link,
    location: photo.location,
  };
}

module.exports.latestPhotos = (userId, keys, total = 4) => {
  ig.use({
    access_token: keys.access_token,
    client_id: keys.client_id,
    client_secret: keys.client_secret,
  });

  return new Promise((resolve, reject) => {
    ig.user_media_recent(userId, { count: total }, (error, result) => {
      if (!error) {
        const photos = result.map(photo => mapPhoto(photo));

        return resolve(photos);
      }

      return reject(error);
    });
  });
};
