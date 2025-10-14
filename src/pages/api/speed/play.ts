import { broadcastEvent } from './played';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request }) => {
  try {
    broadcastEvent(1);
    return new Response('OK', { status: 200 });
  } catch (err) {
    return new Response('Invalid JSON', { status: 400 });
  }
};
