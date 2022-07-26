import { vi, it, describe, expect, beforeEach } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import LastFm, { TRACKS_TO_DISPLAY } from './LastFm.vue';

const mountWith = (options) => {
  return shallowMount(LastFm, options);
};

describe('<LastFm />', () => {
  let lastFm;
  let fetch;

  beforeEach(() => {
    fetch = vi.fn().mockImplementationOnce(() => new Promise(vi.fn(), vi.fn()));

    lastFm = mountWith({
      propsData: {
        fetch,
      },
    });
  });

  it('should render the component', () => {
    expect(lastFm.exists()).toBe(true);
  });

  it('should render placeholders for the total number of tracks', () => {
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
    expect(fetch).toHaveBeenCalledWith(`lastfm/${TRACKS_TO_DISPLAY}`);
  });

  describe('when the endpoint fetches data', () => {
    let response;

    beforeEach(() => {
      response = [{}, {}, {}, {}, {}, {}];

      fetch = vi
        .fn()
        .mockImplementationOnce(
          () => new Promise((resolve) => resolve(response)),
        );

      lastFm = mountWith({
        propsData: {
          fetch,
        },
      });
    });

    it('should render the track components', () => {
      expect(lastFm.findAll('[data-qa="lastfm-track"]').length).toBe(
        response.length,
      );
    });

    describe('when the last.fm track emits a video event', () => {
      let trackNumber = 0;

      beforeEach(async () => {
        await lastFm
          .find('[data-qa="lastfm-track"]')
          .trigger('display:video', { trackNumber });
      });

      it('should display a YouTube component', () => {
        expect(
          lastFm
            .findAll('[data-qa="lastfm-item"]')
            .at(trackNumber)
            .find('[data-qa="lastfm-youtube"]')
            .exists(),
        ).toBe(true);
      });
    });
  });
});
