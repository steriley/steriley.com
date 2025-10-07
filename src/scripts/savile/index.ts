import {
  Savile,
  calculateDistance,
  getAdvice,
  jokes,
  loadGoogleMap,
} from './utils';

let currentPosition = { coords: Savile };
let userMarker;
let map: google.maps.Map;
let interval: NodeJS.Timeout;

const mapObj = loadGoogleMap(currentPosition);

map = mapObj.map;
userMarker = mapObj.userMarker;

const watch = (position?: {
  coords: GeolocationCoordinates;
  timestamp: number;
}) => {
  const adviceEl = document.getElementById('advice');
  const distanceEl = document.getElementById('distance');

  if (!adviceEl || !distanceEl) return false;

  clearInterval(interval);

  interval = setInterval(
    () =>
      (adviceEl.innerHTML = jokes[Math.floor(Math.random() * jokes.length)]),
    7000,
  );

  if (position) {
    const { latitude, longitude } = position.coords;

    currentPosition = position;

    if (map) {
      const userLatLng = new google.maps.LatLng(latitude, longitude);
      const jimmyLatLng = new google.maps.LatLng(
        Savile.latitude,
        Savile.longitude,
      );
      const longitudeGreater = () => userLatLng.lng() > jimmyLatLng.lng();

      map.fitBounds(
        new google.maps.LatLngBounds(
          longitudeGreater() ? jimmyLatLng : userLatLng,
          longitudeGreater() ? userLatLng : jimmyLatLng,
        ),
      );

      if (userMarker) {
        userMarker.setPosition(userLatLng);
      }
    }

    const distanceNum = calculateDistance(
      Savile.latitude,
      Savile.longitude,
      latitude,
      longitude,
    );

    const distance = distanceNum.toFixed(3);

    distanceEl.innerHTML = distance;
    adviceEl.innerHTML = getAdvice(distanceNum);

    return true;
  }

  adviceEl.innerHTML =
    'Sorry but to detect your distance from Savile your device needs to be aware of your location.';

  return false;
};

(() =>
  'geolocation' in navigator
    ? navigator.geolocation.watchPosition(
        (position) => watch(position),
        () => watch(),
      )
    : watch())();
