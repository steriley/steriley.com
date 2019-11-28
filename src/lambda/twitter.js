const Twitter = require('twitter');
const { format } = require('date-fns');
const dotenv = require('dotenv');

dotenv.config();

function mapTweet(tweet) {
  const isoDate = tweet.created_at;

  return {
    created: {
      iso: isoDate,
      short: format(new Date(isoDate), 'dd LLL'),
      time: format(new Date(isoDate), 'p - d LLL yy'),
    },
    id_str: tweet.id_str,
    text: tweet.text,
    retweet_count: tweet.retweet_count,
    favorite_count: tweet.retweeted_status.favorite_count,
    user: {
      name: tweet.user.name,
      screen_name: tweet.user.screen_name,
      profile_image_url_https: tweet.user.profile_image_url_https,
    },
  };
}

function getTweet(tweets) {
  const lastNoneReply = tweets
    .filter(tweet => tweet.in_reply_to_user_id === null)
    .shift();

  return mapTweet(lastNoneReply);
}

function lastTweet(screenName) {
  const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  });

  return new Promise((resolve, reject) => {
    client.get('statuses/user_timeline', { screenName }, (error, tweets) => {
      if (error) {
        return reject(error);
      }

      return resolve(getTweet(tweets));
    });
  });
}

exports.handler = async (event, context, callback) => {
  const tweet = await lastTweet('');

  callback(null, {
    statusCode: 200,
    body: JSON.stringify(tweet),
  });
};
