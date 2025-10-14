import type { APIRoute } from 'astro';

const clients: any[] = [];
let totalPlays = 0;

export const GET: APIRoute = async ({ request }) => {
  const stream = new ReadableStream({
    start(controller) {
      const keepAlive = setInterval(() => {
        try {
          controller.enqueue(`: ping\n\n`);
        } catch (err) {
          clearInterval(keepAlive);
          const idx = clients.indexOf(controller);
          if (idx !== -1) clients.splice(idx, 1);
        }
      }, 15000);

      request.signal.addEventListener('abort', () => {
        clearInterval(keepAlive);
        try {
          controller.close();
        } catch {
          // ignore
        }
        const idx = clients.indexOf(controller);
        if (idx !== -1) clients.splice(idx, 1);
      });

      clients.push(controller);

      try {
        controller.enqueue(`data: ${JSON.stringify(totalPlays)}\n\n`);
      } catch {
        // ignore
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'Access-Control-Allow-Origin': '*', // adjust or remove for production
    },
  });
};

export function broadcastEvent(data: unknown) {
  for (const controller of clients.slice()) {
    try {
      totalPlays += data as number;
      controller.enqueue(`data: ${JSON.stringify(totalPlays)}\n\n`);
    } catch (err) {
      const idx = clients.indexOf(controller);
      if (idx !== -1) clients.splice(idx, 1);
    }
  }
}
