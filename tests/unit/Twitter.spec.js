const twitter = require('../../app/twitter');
const mockTweets = require('../mocks/tweets');

describe('twitter.js', () => {
  it('returns a single tweet', async () => {
    twitter.lastTweet = jest.fn().mockImplementation(() =>
      Promise.resolve(twitter.getTweet(mockTweets)));

    const tweet = await twitter.lastTweet('UserName', {});

    expect(tweet).toEqual({
      created: {
        iso: 'Fri Jun 08 13:30:00 +0000 2018',
        short: '08 Jun',
        time: '2:30 PM - 8 Jun 18',
      },
      favorite_count: 940,
      id_str: '1005079499669671936',
      retweet_count: 174,
      text: 'RT @iom_tt: Peter Hickman wins the Senior TT! #iomtt',
      user: {
        name: 'Stephen Riley',
        profile_image_url_https:
          'https://pbs.twimg.com/profile_images/3245238717/ceb51eb0c583036bf3683886d49c0a13_normal.jpeg',
        screen_name: 'SteRiley',
      },
    });
  });
});
