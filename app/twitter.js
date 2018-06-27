const Twitter = require('twitter');
const dateFns = require('date-fns');

function mapTweet(tweet) {
  const isoDate = tweet.created_at;

  return {
    created: {
      iso: isoDate,
      short: dateFns.format(new Date(isoDate), 'DD MMM'),
      time: dateFns.format(new Date(isoDate), 'h:mm A - D MMM YY'),
    },
    id_str: tweet.id_str,
    text: tweet.text,
    retweet_count: tweet.retweet_count,
    favorite_count: tweet.retweeted_status.favorite_count,
    user: {
      screen_name: tweet.user.screen_name,
      profile_image_url_https: tweet.user.profile_image_url_https,
    },
  };
}

module.exports.lastTweet = (screenName, keys) => {
  const client = new Twitter({
    consumer_key: keys.consumer_key,
    consumer_secret: keys.consumer_secret,
    access_token_key: keys.access_token_key,
    access_token_secret: keys.access_token_secret,
  });

  return new Promise((resolve, reject) => {
    client.get('statuses/user_timeline', { screenName }, (error, tweets) => {
      if (!error) {
        const lastNoneReply = tweets.filter(tweet => tweet.in_reply_to_user_id === null).shift();

        return resolve(mapTweet(lastNoneReply));
      }

      return reject(error);
    });
  });
};
