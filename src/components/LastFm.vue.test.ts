import LastFm from './LastFm.vue';
import { type VueWrapper, shallowMount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';

const mountWith = (options?: any): VueWrapper => shallowMount(LastFm, options);

describe('<LastFm />', () => {
  let lastFm: VueWrapper;

  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve([]),
        }),
      ),
    );
    lastFm = mountWith({
      stubs: {
        LastFmTrack: true,
      },
    });
  });

  it('should render the component', () => {
    expect(lastFm.exists()).toBe(true);
  });

  it.skip('should render placeholders for the total number of tracks', () => {
    expect(lastFm.findAll('[data-qa="lastfm-placeholder"]').length).toEqual(
      TRACKS_TO_DISPLAY,
    );
  });

  it('should NOT render any track components', () => {
    expect(lastFm.findAll('[data-qa="lastfm-track"]').length).toBe(0);
  });

  it('should NOT render any YouTube components', () => {
    expect(lastFm.findAll('[data-qa="lastfm-youtube"]').length).toBe(0);
  });

  it('should make a fetch request to the endpoint', () => {
    expect(global.fetch).toHaveBeenCalledWith(`/api/lastfm`);
  });

  describe('when the endpoint fetches data', () => {
    const fakeTrack = {
      url: 'TRACK_URL',
      artwork: 'TRACK_ARTWORK',
      artist: 'TRACK_ARTIST',
      title: 'TRACK_TITLE',
      date: {
        utc: 0,
        formatted: 'TRACK_FORMATTED_DATE',
      },
      trackNumber: 0,
    };

    const fakeResponse = [
      fakeTrack,
      fakeTrack,
      fakeTrack,
      fakeTrack,
      fakeTrack,
      fakeTrack,
    ];

    beforeEach(async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn(() =>
          Promise.resolve({
            json: () => Promise.resolve(fakeResponse),
          }),
        ),
      );

      lastFm = mountWith();
      await nextTick();
    });

    it('should render the track components', () => {
      expect(lastFm.findAll('[data-qa="lastfm-track"]').length).toBe(
        fakeResponse.length,
      );
    });
  });
});
