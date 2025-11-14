import { type APIRoute } from 'astro';
import { getSecret } from 'astro:env/server';
import { formatDistance } from 'date-fns';

export type LastFmRequest = {
  username: string;
  apiKey: string;
  tracksDisplayed?: number;
};

type LastFmTrackDate = {
  uts: string;
  '#text': string;
};

type LastFmRecentTracks = {
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

const TRACKS_DISPLAYED = 6;

function apiUrl({
  username,
  apiKey,
  tracksDisplayed = TRACKS_DISPLAYED,
}: LastFmRequest) {
  const url = 'https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks';
  const params = `&user=${username}&limit=${tracksDisplayed}&api_key=${apiKey}&format=json`;

  return `${url}${params}`;
}

function formatDate(timestamp: LastFmTrackDate | undefined) {
  const date = {
    utc: 0,
    formatted: 'Listening now',
  };

  if (timestamp) {
    const d = new Date(0);
    const past = new Date(d.setUTCSeconds(parseInt(timestamp.uts)));

    date.utc = past.getTime();
    date.formatted = formatDistance(past, new Date(), {
      includeSeconds: true,
      addSuffix: true,
    });
  }

  return date;
}

function formatTracks({ recenttracks: { track } }: LastFmRecentTracks) {
  return track.map(({ artist, name, url, date, image }) => ({
    artist: artist['#text'],
    title: name,
    url: url,
    date: formatDate(date),
    artwork: image.find((img) => img.size === 'medium')?.['#text'],
  }));
}

export const GET: APIRoute = async ({ params, request }) => {
  const apiKey = getSecret('LASTFM_CONSUMER_KEY')!;
  const username = getSecret('LASTFM_USER_ID')!;
  const trackParam = Number(params.tracksDisplayed);
  const tracksDisplayed = isNaN(trackParam) ? TRACKS_DISPLAYED : trackParam;

  const url = apiUrl({ username, apiKey, tracksDisplayed });
  const data = await fetch(url);
  const json = (await data.json()) as LastFmRecentTracks;

  if (!json.recenttracks) return new Response('No data', { status: 500 });

  const tracks = formatTracks(json).slice(0, tracksDisplayed);

  return new Response(JSON.stringify(tracks));
};
