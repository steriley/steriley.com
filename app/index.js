const express = require('express');
const bodyParser = require('body-parser');
const apicache = require('apicache');

const mail = require('./mail');
const instagram = require('./instagram');
const lastfm = require('./lastfm');
const twitter = require('./twitter');

const app = express();
const cache = apicache.middleware;
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json('hello world.');
});

app.get('/api/twitter', cache('5 minutes'), async (req, res) => {
  const tweet = await twitter.lastTweet('SteRiley', {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  });

  res.json(tweet);
});

app.get('/api/instagram/:total?', cache('1 hour'), (req, res) => {
  instagram
    .latestPhotos(
      process.env.INSTAGRAM_USER_ID,
      {
        access_token: process.env.INSTAGRAM_ACCESS_TOKEN,
        client_id: process.env.INSTAGRAM_CLIENT_ID,
        client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
      },
      req.params.total,
    )
    .then(photos => res.json(photos));
});

app.get('/api/lastfm/:total?', cache('3 minutes'), (req, res) => {
  lastfm
    .recentlyPlayed(
      process.env.LASTFM_USER_ID,
      process.env.LASTFM_CONSUMER_KEY,
      req.params.total,
    )
    .then(tracks => res.json(tracks));
});

app.post('/api/contact', (req, res) => {
  mail.send(req.body)
    .then(response => res.json(response));
});

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
