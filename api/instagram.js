import fetch from 'node-fetch';

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 's-maxage=86400');

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
    response.json(json);
  } catch (error) {
    console.error(error);
  }
}
