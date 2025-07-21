import { Hono } from 'hono';
import { handle } from 'hono/vercel';

import { send } from './mail.js';
import { recentlyPlayed } from './lastfm/lastfm.js';

export const runtime = 'nodejs';

const app = new Hono().basePath('/api');

app.get('/lastfm/:total?', async (c) => {
  try {
    const total = c.req.param('total');
    const tracks = await recentlyPlayed(
      process.env.LASTFM_USER_ID,
      process.env.LASTFM_CONSUMER_KEY,
      total,
    );

    return c.json(tracks);
  } catch (error) {
    const errorMessage = 'Ensure LASTFM_USER_ID & LASTFM_CONSUMER_KEY are provided';
    console.error(error);
    return c.json({ error: errorMessage });
  }
});

app.post('/contact', async (c) => {
  const body = await c.req.json()
  const response = await send(body)

  return c.json(response);
});

export const GET = handle(app);
export const POST = handle(app);
