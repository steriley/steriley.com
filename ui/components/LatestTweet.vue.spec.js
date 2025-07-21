import { vi, it, describe, expect, beforeEach } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import LatestTweet from './LatestTweet.vue';

const mountWith = (options) => {
  return shallowMount(LatestTweet, options);
};

const dataQa = (str) => `[data-qa="${str}"]`;

describe('<LatestTweet />', () => {
  let latestTweet;
  let fakeResponse;

  beforeEach(() => {
    fakeResponse = {
      id_str: '1234567890',
      text: 'The tweet: https://short.url #hash #tag',
      created: { short: '01 Jan', time: '12:00 PM - 01 Jan 22' },
      user: {
        name: 'Your Name',
        screen_name: 'ScreenName',
        profile_image_url_https: 'https://long.url',
      },
    };

    global.fetch = vi.fn(() => ({
      json: vi.fn(() => new Promise((res) => res(fakeResponse))),
    }));

    latestTweet = mountWith();
  });

  it('should render the component', () => {
    expect(latestTweet.exists()).toBe(true);
  });

  it('should render a fake placeholder while loading', () => {
    expect(latestTweet.find(dataQa('tweet-placeholder')).exists()).toBe(true);
  });

  describe('when data is fetched', () => {
    it('should render the latest tweet', () => {
      expect(latestTweet.find(dataQa('tweet-latest')).exists()).toBe(true);
    });

    describe('tweet avatar', () => {
      let avatar;

      beforeEach(() => {
        avatar = latestTweet.find(dataQa('tweet-avatar'));
      });

      it('should render the author avatar', () => {
        expect(avatar.exists()).toBe(true);
      });

      it('should have an image', () => {
        let img = avatar.find('img');

        expect(img.exists()).toBe(true);
        expect(img.attributes('alt')).toBeTruthy();
      });
    });

    it('should render the author', () => {
      expect(latestTweet.find(dataQa('tweet-author')).exists()).toBe(true);
    });

    it('should render the tweet time', () => {
      expect(latestTweet.find(dataQa('tweet-time')).exists()).toBe(true);
    });

    it('should render the tweet text', () => {
      expect(latestTweet.find(dataQa('tweet-text')).exists()).toBe(true);
    });
  });
});
