import mockLastFm from '../../../mocks/lastfm.mock.json' with { type: 'json' };
import { GET as recentlyPlayed } from './lastfm.js';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const MOCK_ENV_VARS: Record<string, string> = {
  LASTFM_CONSUMER_KEY: 'mockApiKey',
  LASTFM_USER_ID: 'mockUsername',
};

vi.mock('astro:env/server', () => ({
  getSecret: vi.fn((param) => MOCK_ENV_VARS[param]),
}));

vi.stubGlobal(
  'fetch',
  vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockLastFm),
    }),
  ),
);

describe('LastFM', () => {
  let response: any;

  const mockParameters = {
    tracksDisplayed: '10',
  };

  beforeEach(async () => {
    const data = await recentlyPlayed({
      params: mockParameters,
      request: {},
    } as any);
    response = await data.json();
  });

  it('should call the correct endpoint', () => {
    expect(fetch).toHaveBeenCalledWith(
      `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${MOCK_ENV_VARS.LASTFM_USER_ID}&limit=${mockParameters.tracksDisplayed}&api_key=${MOCK_ENV_VARS.LASTFM_CONSUMER_KEY}&format=json`,
    );
  });

  it('should return an Array', () => {
    expect(response).toEqual(expect.objectContaining([]));
  });

  it('should have more than a single item in the Array', () => {
    expect(response.length).toBeGreaterThan(1);
  });

  it('should contain an array of track objects', () => {
    expect(response[0]).toEqual({
      artist: expect.any(String),
      artwork: expect.any(String),
      title: expect.any(String),
      url: expect.any(String),
      date: {
        formatted: expect.any(String),
        utc: expect.any(Number),
      },
    });
  });

  describe('when formatted date is parsed', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    describe('when NO date object is returned in response', () => {
      let trackWithoutDate = mockLastFm.recenttracks.track[0];

      beforeEach(async () => {
        const date = new Date();
        vi.setSystemTime(date);

        const data = await recentlyPlayed({
          params: mockParameters,
          request: {},
        } as any);
        response = await data.json();
      });

      it('should display track time as Listening now', () => {
        expect(trackWithoutDate?.date).toBeUndefined();
        expect(response[0].date.formatted).toBe('Listening now');
      });
    });

    describe('when date object is returned in response', () => {
      let trackWithDate = mockLastFm.recenttracks.track[1];

      beforeEach(async () => {
        const date = new Date(0).setUTCSeconds(
          parseInt(trackWithDate?.date?.uts || '0'),
        );
        vi.setSystemTime(date);

        const data = await recentlyPlayed({
          params: mockParameters,
          request: {},
        } as any);
        response = await data.json();
      });

      it('should display how long since track was played', () => {
        expect(trackWithDate?.date).toBeDefined();
        expect(response[1].date.formatted).toBe('less than 5 seconds ago');
      });
    });
  });
});
