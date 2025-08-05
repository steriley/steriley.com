import LastFm from './LastFm.vue';
import { shallowMount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';

const mountWith = (options) => {
  return shallowMount(LastFm, options);
};

describe('<LastFm />', () => {
  let lastFm;

  beforeEach(() => {
    global.fetch = vi.fn(() => ({
      json: vi.fn(() => new Promise((res) => res([]))),
    }));

    lastFm = mountWith();
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
    let response;

    beforeEach(async () => {
      response = [{}, {}, {}, {}, {}, {}];

      global.fetch = vi.fn(() => ({
        json: vi.fn(() => new Promise((res) => res(response))),
      }));

      lastFm = mountWith();
      await nextTick();
    });

    it('should render the track components', () => {
      expect(lastFm.findAll('[data-qa="lastfm-track"]').length).toBe(
        response.length,
      );
    });
  });
});
