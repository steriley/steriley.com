import { it, describe, expect, vi, beforeEach } from 'vitest';
import { recentlyPlayed } from './lastfm.js';
import mockLastFm from './lastfm.mock.json';
import fetch from 'node-fetch';

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

describe('lastfm.js', () => {
  let response;
  let username = 'theUser';
  let totalTracks = 10;
  let apiKey = 'special-key';

  beforeEach(async () => {
    response = await recentlyPlayed(username, apiKey, totalTracks);
  });

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

        response = await recentlyPlayed();
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

        response = await recentlyPlayed();
      });

      it('should display how long since track was played', () => {
        expect(trackWithDate.date).toBeDefined();
        expect(response[1].date.formatted).toBe('less than 5 seconds ago');
      });
    });
  });
});
