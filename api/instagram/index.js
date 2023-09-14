import fetch from 'node-fetch';
import { kv } from '@vercel/kv';

function formatJSON(json) {
  const photos = json.data.user.edge_owner_to_timeline_media.edges.map(
    (photo) => ({
      shortcode: photo.node.shortcode,
      taken_at: photo.node.taken_at_timestamp,
      location: photo.node.location.name,
      thumbnail_src: photo.node.thumbnail_src,
      caption: photo.node.edge_media_to_caption.edges[0].node.text,
      likes: photo.node.edge_media_preview_like.count,
    }),
  );

  return photos;
}

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
    const formattedJSON = formatJSON(json);
    await kv.set(kvKey, formattedJSON, { ex: 86400 });
    response.json(formattedJSON);
    return formattedJSON;
  } catch (error) {
    console.error(error);
  }
}
