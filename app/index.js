import express from 'express';
import bodyParser from 'body-parser';
import apicache from 'apicache';

import { send } from './mail.js';
import { latestPhotos } from './instagram.js';
import { recentlyPlayed } from './lastfm.js';
import { lastTweet } from './twitter/twitter.js';

const app = express();
const cache = apicache.middleware;
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json('hello world.');
});

app.get('/api/twitter', cache('5 minutes'), async (req, res) => {
  try {
    const tweets = await lastTweet('4324661');

    res.json(tweets);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
});

app.get('/api/instagram/:total?', cache('1 hour'), (req, res) => {
  latestPhotos(
    process.env.INSTAGRAM_USER_ID,
    {
      access_token: process.env.INSTAGRAM_ACCESS_TOKEN,
      client_id: process.env.INSTAGRAM_CLIENT_ID,
      client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
    },
    req.params.total,
  )
    .then((photos) => res.json(photos))
    .catch((e) => res.json(e));
});

app.get('/api/lastfm/:total?', cache('3 minutes'), (req, res) => {
  recentlyPlayed(
    process.env.LASTFM_USER_ID,
    process.env.LASTFM_CONSUMER_KEY,
    req.params.total,
  )
    .then((tracks) => res.json(tracks))
    .catch(() => {
      let error = 'Ensure LASTFM_USER_ID & LASTFM_CONSUMER_KEY are provided';
      console.error(error);
      res.status(500).json({ error });
    });
});

app.post('/api/contact', (req, res) => {
  send(req.body).then((response) => res.json(response));
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
