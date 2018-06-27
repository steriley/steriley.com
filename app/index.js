const express = require('express');
const twitter = require('./twitter');
const instagram = require('./instagram');
const lastfm = require('./lastfm');

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.json('hello world');
});

app.get('/api/twitter', (req, res) => {
  twitter
    .lastTweet('SteRiley', {
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
      access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    })
    .then(tweet => res.json(tweet));
});

app.get('/api/instagram', (req, res) => {
  instagram
    .latestPhotos(process.env.INSTAGRAM_USER_ID, {
      access_token: process.env.INSTAGRAM_ACCESS_TOKEN,
      client_id: process.env.INSTAGRAM_CLIENT_ID,
      client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
    })
    .then(photos => res.json(photos));
});

app.get('/api/lastfm', (req, res) => {
  lastfm
    .recentlyPlayed(process.env.LASTFM_USER_ID, process.env.LASTFM_CONSUMER_KEY)
    .then(tracks => res.json(tracks));
});

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
