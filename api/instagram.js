import fetch from 'node-fetch';
import { kv } from '@vercel/kv';

export default async function handler(request, response) {
  const kvKey = 'instagram';
  const storedData = await kv.get(kvKey);

  response.setHeader('Cache-Control', 's-maxage=86400');

  if (storedData) {
    return response.json(storedData);
  }

  const host = 'instagram28.p.rapidapi.com';
  const query = {
    user_id: '12461648',
    batch_size: '10',
  };
  const url = new URL(`https://${host}/medias`);
  url.search = new URLSearchParams(query).toString();
  const headers = {
    'X-RapidAPI-Key': process.env.RAPID_API_KEY,
    'X-RapidAPI-Host': host,
  };

  try {
    const data = await fetch(url.toString(), { headers });
    const json = await data.json();
    await kv.set(kvKey, json, { ex: 86400 });
    response.json(json);
  } catch (error) {
    console.error(error);
  }
}
