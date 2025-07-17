import { TwitterApi } from 'twitter-api-v2';
import { format } from 'date-fns';

const client = new TwitterApi(process.env.TWITTER_BEARER_TOKEN);
const roClient = client.readOnly;

function getTweet(tweets) {
  const { id, created_at, text } = tweets._realData.data[0];
  const { username, name, profile_image_url } =
    tweets._realData.includes.users[0];

  return {
    id_str: id,
    text,
    created: {
      short: format(new Date(created_at), 'dd MMM'),
      time: format(new Date(created_at), 'h:mm b - d MMM yy'),
    },
    user: {
      name,
      screen_name: username,
      profile_image_url_https: profile_image_url,
    },
  };
}

export async function lastTweet(userId) {
  const tweets = await roClient.v2.userTimeline(userId, {
    exclude: ['retweets', 'replies'],
    expansions: ['author_id'],
    max_results: 5,
    'tweet.fields': ['created_at'],
    'user.fields': ['profile_image_url'],
  });

  return getTweet(tweets);
}
