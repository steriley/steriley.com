import { it, describe, expect, vi, afterEach, beforeEach } from 'vitest';
import instagram from './index';
import fetch from 'node-fetch';
import mockInstagram from './instagram.mock.json';
import { kv } from '@vercel/kv';

vi.mock('node-fetch', () => ({
  default: vi.fn(
    () =>
      new Promise((res) =>
        res({
          json: vi.fn(() => mockInstagram),
        }),
      ),
  ),
}));

vi.mock('@vercel/kv', () => ({
  kv: {
    get: vi.fn(),
    set: vi.fn(),
  },
}));

describe('instagram.js', () => {
  let response;
  let mockRes = {
    status: () => {
      return mockRes;
    },
    json: vi.fn(),
    setHeader: vi.fn(),
  };

  beforeEach(async () => {
    response = await instagram(undefined, mockRes);
  });

  it('should return an object for display in the client', () => {
    expect(response[0]).toEqual(
      expect.objectContaining({
        shortcode: 'Cwv0l6KttO5',
        taken_at: 1693781775,
        location: 'Chatsworth River',
        thumbnail_src:
          'https://scontent-ord5-1.cdninstagram.com/v/t51.2885-15/375102528_813530630553061_2675345687388587486_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&_nc_ht=scontent-ord5-1.cdninstagram.com&_nc_cat=101&_nc_ohc=az09CJzCUC0AX9S4_sM&edm=APU89FABAAAA&ccb=7-5&ig_cache_key=MzE4Mzk5NDc2NTA3MDIyNjM2MQ%3D%3D.2-ccb7-5&oh=00_AfD_msNHs37csQY-DzXZiDBmy_xlD8HCKXovcSn4jzrnFQ&oe=6506235D&_nc_sid=bc0c2c',
        caption: 'The last day of summer',
        likes: 12,
      }),
    );
  });
});
