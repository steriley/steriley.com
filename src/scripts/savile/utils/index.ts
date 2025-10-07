import { getAdvice } from './advice';
import { calculateDistance } from './geo-distance';
import { jokes } from './jokes';
import { loadGoogleMap } from './load-google-map';
import { generateMarkerImages } from './markers';

export {
  jokes,
  getAdvice,
  calculateDistance,
  generateMarkerImages,
  loadGoogleMap,
};

// approximation of savile in the ground
export const Savile = { latitude: 54.277, longitude: -0.446 };
