import { formatDistance } from 'date-fns';

function apiUrl(username, apiKey, totalTracks = 5) {
  const url = 'https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks';
  const params = `&user=${username}&limit=${totalTracks}&api_key=${apiKey}&format=json`;

  return `${url}${params}`;
}

function formatDate(obj) {
  const date = {
    utc: 0,
    formatted: 'Listening now',
  };

  if (obj) {
    const d = new Date(0);
    const past = new Date(d.setUTCSeconds(obj.uts));

    date.utc = past.getTime();
    date.formatted = formatDistance(past, new Date(), {
      includeSeconds: true,
      addSuffix: true,
    });
  }

  return date;
}

function formatTracks(json) {
  return json.recenttracks.track.map((track) => ({
    artist: track.artist['#text'],
    title: track.name,
    url: track.url,
    date: formatDate(track.date),
    artwork: track.image.filter((img) => img.size === 'medium').pop()['#text'],
  }));
}

export const recentlyPlayed = (username, apiKey, total) =>
  new Promise((resolve, reject) => {
    fetch(apiUrl(username, apiKey, total))
      .then((res) => res.json())
      .then((json) => resolve(formatTracks(json)))
      .catch((err) => reject(err));
  });
