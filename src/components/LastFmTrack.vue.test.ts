import LastFmTrack from './LastFmTrack.vue';
import { shallowMount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';

const mountWith = (options) => {
  return shallowMount(LastFmTrack, options);
};

describe('<LastFmTrack />', () => {
  let lastFmTrack;
  let artwork;
  let artist;
  let title;
  let url;
  let date;
  let trackNumber;

  beforeEach(() => {
    artwork = 'TRACK_ARTWORK';
    artist = 'TRACK_ARTIST';
    title = 'TRACK_TITLE';
    url = 'TRACK_URL';
    date = {
      utc: 0,
      formatted: 'TRACK_FORMATTED_DATE',
    };
    trackNumber = 0;

    lastFmTrack = mountWith({
      propsData: {
        artwork,
        artist,
        title,
        url,
        date,
        trackNumber,
      },
    });
  });

  it('should render the component', () => {
    expect(lastFmTrack.exists()).toBe(true);
  });

  it('should render a link with url', () => {
    expect(lastFmTrack.find('a').attributes('href')).toBe(url);
  });

  it('should render an image of the track artwork', () => {
    expect(lastFmTrack.find('img').attributes('src')).toBe(artwork);
    expect(lastFmTrack.find('img').attributes('alt')).toBe(
      `${artist} - ${title}`,
    );
  });

  it('should render track artist name', () => {
    expect(lastFmTrack.find('.track__artist').text()).toBe(artist);
  });

  it('should render track title', () => {
    expect(lastFmTrack.find('.track__title').text()).toBe(title);
  });

  it('should render date track was played', () => {
    expect(lastFmTrack.find('.track__date').text()).toBe(date.formatted);
    expect(lastFmTrack.find('.track__date').attributes('date-time')).toEqual(
      date.utc.toString(),
    );
    expect(lastFmTrack.find('.track__date').classes()).toContain(
      'track__date--now',
    );
  });

  describe('when the datestamp is not zero', () => {
    beforeEach(() => {
      lastFmTrack.setProps({ date: { utc: 1 } });
    });

    it('should NOT have the now class', () => {
      expect(lastFmTrack.find('.track__date').classes()).not.toContain(
        'track__date--now',
      );
    });
  });
});
