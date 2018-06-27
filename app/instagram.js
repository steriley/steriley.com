const ig = require('instagram-node').instagram();

function mapPhoto(photo) {
  return {
    images: photo.images,
    created_time: photo.created_time,
    caption: photo.caption,
    comments: photo.comments,
    likes: photo.likes,
    filter: photo.filter,
    link: photo.link,
    location: photo.location,
  };
}

module.exports.latestPhotos = function (userId, keys) {
  ig.use({
    access_token: keys.access_token,
    client_id: keys.client_id,
    client_secret: keys.client_secret,
  });

  return new Promise((resolve, reject) => {
    ig.user_media_recent(userId, { count: 14 }, (error, result) => {
      if (!error) {
        const photos = result.map(photo => mapPhoto(photo));

        return resolve({ instagram: photos });
      }

      return reject(error);
    });
  });
};
