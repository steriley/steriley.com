import { formatDistance } from 'date-fns';

import type {
  LastFmRecentTracks,
  LastFmRequest,
  LastFmTrackDate,
} from './types.js';

function apiUrl({ username, apiKey, limit = '5' }: LastFmRequest) {
  const url = 'https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks';
  const params = `&user=${username}&limit=${limit}&api_key=${apiKey}&format=json`;

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

export const recentlyPlayed = async ({
  username,
  apiKey,
  limit,
}: LastFmRequest) => {
  const url = apiUrl({ username, apiKey, limit });
  const data = await fetch(url);
  const json = (await data.json()) as LastFmRecentTracks;
  return formatTracks(json);
};
