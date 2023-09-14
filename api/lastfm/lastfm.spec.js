import { it, describe, expect, vi, afterEach, beforeEach } from 'vitest';
import lastFm, { kvKey } from './index';
import mockLastFm from './lastfm.mock.json';
import fetch from 'node-fetch';
import { kv } from '@vercel/kv';

vi.mock('node-fetch', () => ({
  default: vi.fn(
    () =>
      new Promise((res) =>
        res({
          json: vi.fn(() => mockLastFm),
        }),
      ),
  ),
}));

vi.mock('@vercel/kv', () => ({
  kv: {
    get: vi.fn(),
    set: vi.fn(),
  },
}));

describe('lastfm.js', () => {
  const env = process.env;
  let response;
  let username = 'theUser';
  let totalTracks = 10;
  let apiKey = 'special-key';
  let mockRes = {
    status: () => {
      return mockRes;
    },
    json: vi.fn(),
  };
  let mockReq = {
    query: {
      total: totalTracks,
    },
  };

  beforeEach(async () => {
    vi.resetModules();
    process.env = { LASTFM_USER_ID: username, LASTFM_CONSUMER_KEY: apiKey };
    response = await lastFm(mockReq, mockRes);
  });

  afterEach(() => {
    process.env = env;
  });

  it('should attempt to get the cached response from the kv store', () => {
    expect(kv.get).toHaveBeenCalledWith(kvKey);
  });

  it.todo('should respond with the cached data');

  it.todo('should cache the response in kv store for 3 minutes');

  it('should call the correct endpoint', () => {
    expect(fetch).toHaveBeenCalledWith(
      `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&limit=${totalTracks}&api_key=${apiKey}&format=json`,
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

        response = await lastFm(mockReq, mockRes);
      });

      it('should display track time as Listening now', () => {
        expect(trackWithoutDate.date).toBeUndefined();
        expect(response[0].date.formatted).toBe('Listening now');
      });
    });

    describe('when date object is returned in response', () => {
      let trackWithDate = mockLastFm.recenttracks.track[1];

      beforeEach(async () => {
        const date = new Date(0).setUTCSeconds(trackWithDate.date.uts);
        vi.setSystemTime(date);

        response = await lastFm(mockReq, mockRes);
      });

      it('should display how long since track was played', () => {
        expect(trackWithDate.date).toBeDefined();
        expect(response[1].date.formatted).toBe('less than 5 seconds ago');
      });
    });
  });
});
