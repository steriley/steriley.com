import { it, describe, expect, beforeEach } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import LastFmTrack from './LastFmTrack.vue';

const mountWith = (options) => {
  return shallowMount(LastFmTrack, options);
};

describe('<LastFmTrack />', () => {
  let lastFmTrack;
  let track;
  let trackNumber;

  beforeEach(() => {
    track = {
      artwork: 'TRACK_ARTWORK',
      artist: 'TRACK_ARTIST',
      title: 'TRACK_TITLE',
      url: 'TRACK_URL',
      date: {
        utc: 0,
        formatted: 'TRACK_FORMATTED_DATE',
      },
    };
    trackNumber = 0;

    lastFmTrack = mountWith({
      propsData: {
        track,
        trackNumber,
      },
    });
  });

  it('should render the component', () => {
    expect(lastFmTrack.exists()).toBe(true);
  });

  it('should render a link with url', () => {
    expect(lastFmTrack.find('a').attributes('href')).toBe(track.url);
  });

  it('should render an image of the track artwork', () => {
    expect(lastFmTrack.find('img').attributes('src')).toBe(track.artwork);
    expect(lastFmTrack.find('img').attributes('alt')).toBe(
      `${track.artist} - ${track.title}`,
    );
  });

  it('should render track artist name', () => {
    expect(lastFmTrack.find('.track__artist').text()).toBe(track.artist);
  });

  it('should render track title', () => {
    expect(lastFmTrack.find('.track__title').text()).toBe(track.title);
  });

  it('should render date track was played', () => {
    expect(lastFmTrack.find('.track__date').text()).toBe(track.date.formatted);
    expect(lastFmTrack.find('.track__date').attributes('date-time')).toEqual(
      track.date.utc.toString(),
    );
    expect(lastFmTrack.find('.track__date').classes()).toContain(
      'track__date--now',
    );
  });

  describe('when the datestamp is not zero', () => {
    let trackInThePast = { ...track, date: { utc: 1 } };

    beforeEach(() => {
      lastFmTrack.setProps({ track: trackInThePast });
    });

    it('should NOT have the now class', () => {
      expect(lastFmTrack.find('.track__date').classes()).not.toContain(
        'track__date--now',
      );
    });
  });
});
