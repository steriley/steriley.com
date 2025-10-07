import { Savile } from './';
import { generateMarkerImages } from './markers';

export const loadGoogleMap = (initialCenter: {
  coords: { latitude: number; longitude: number };
}) => {
  const mapEl = document.getElementById('map');
  const { coords } = initialCenter;
  const { latitude, longitude } = coords;
  const location = new google.maps.LatLng(latitude, longitude);
  const bounds = new google.maps.LatLngBounds();
  const markerImages = generateMarkerImages(google);

  let userMarker: google.maps.Marker | undefined;

  if (!mapEl) {
    throw new Error('Map element not found');
  }

  const addMarker = ({
    lat,
    lng,
    title,
    icon,
  }: {
    lat: number;
    lng: number;
    title: string;
    icon: google.maps.Icon | string | google.maps.Symbol | undefined;
  }) =>
    new google.maps.Marker({
      map,
      position: new google.maps.LatLng(lat, lng),
      title,
      icon,
    });

  const mapOptions = {
    zoom: 8,
    center: location,
    disableDefaultUI: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  };

  const map = new google.maps.Map(mapEl, mapOptions);

  [
    {
      lat: latitude,
      lng: longitude,
      title: 'You',
      icon: markerImages.user,
    },
    {
      lat: Savile.latitude,
      lng: Savile.longitude,
      title: 'Savile',
      icon: markerImages.jimmy,
    },
  ].forEach((markerObj) => {
    const createdMarker = addMarker(markerObj);

    if (createdMarker.getTitle() === 'You') {
      userMarker = createdMarker;
    }

    bounds.extend(new google.maps.LatLng(markerObj.lat, markerObj.lng));
  });

  map.fitBounds(bounds);

  return {
    map,
    userMarker,
  };
};
