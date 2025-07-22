export type LastFmRequest = {
  username: string;
  apiKey: string;
  limit?: string;
};

export type LastFmTrackDate = {
  uts: string;
  '#text': string;
};

export type LastFmRecentTracks = {
  recenttracks: {
    track: Array<{
      artist: {
        mbid: string;
        '#text': string;
      };
      streamable: string;
      image: Array<{
        size: string;
        '#text': string;
      }>;
      mbid: string;
      album: {
        mbid: string;
        '#text': string;
      };
      name: string;
      url: string;
      date?: LastFmTrackDate;
    }>;
    '@attr': {
      user: string;
      totalPages: string;
      page: string;
      total: string;
      perPage: string;
    };
  };
};
