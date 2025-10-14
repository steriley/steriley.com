import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request }) => {
  const scoreboard = {
    today: [
      { name: 'Player 1', score: 0.215 },
      { name: 'Player 2', score: 0.234 },
      { name: 'Player 3', score: 0.256 },
      { name: 'Player 4', score: 0.278 },
      { name: 'Player 5', score: 0.299 },
      { name: '', score: 1 },
      { name: '', score: 1 },
      { name: '', score: 1 },
      { name: '', score: 1 },
      { name: '', score: 1 },
    ],
    month: [
      { name: 'Player 11', score: 0.198 },
      { name: 'Player 12', score: 0.205 },
      { name: 'Player 13', score: 0.21 },
      { name: 'Player 14', score: 0.22 },
      { name: 'Player 15', score: 0.225 },
      { name: 'Player 16', score: 0.198 },
      { name: 'Player 17', score: 0.205 },
      { name: 'Player 18', score: 0.21 },
      { name: 'Player 19', score: 0.22 },
      { name: 'Player 20', score: 0.225 },
    ],
    beat: '10.000',
  };

  return new Response(JSON.stringify({ scores: scoreboard }), { status: 200 });
};
