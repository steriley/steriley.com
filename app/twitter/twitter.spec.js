import { it, describe, expect, vi, beforeEach } from 'vitest';
import { lastTweet } from './twitter.js';
import mockTweets from './twitter.mock.json';

vi.mock('twitter-api-v2', () => ({
  TwitterApi: vi.fn(() => ({
    readOnly: {
      v2: {
        userTimeline: vi.fn(
          () => new Promise((resolve) => resolve(mockTweets)),
        ),
      },
    },
  })),
}));

describe('twitter.js', () => {
  let tweet;

  beforeEach(async () => {
    tweet = await lastTweet('UserId');
  });

  it('returns a single tweet', async () => {
    expect(tweet).toEqual({
      created: {
        short: '27 Jul',
        time: '8:30 PM - 27 Jul 22',
      },
      id_str: '1552375951358672896',
      text: 'Vite - Next Generation Frontend Tooling: Get ready for a development environment that can finally catch up with you: https://t.co/j1l6X7iiMl #frontend #development',
      user: {
        name: 'Stephen Riley',
        profile_image_url_https:
          'https://pbs.twimg.com/profile_images/3245238717/ceb51eb0c583036bf3683886d49c0a13_normal.jpeg',
        screen_name: 'SteRiley',
      },
    });
  });
});
