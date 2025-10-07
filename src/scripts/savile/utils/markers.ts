import jimmyImg from '../img/icn_savile.png';
import userImg from '../img/icn_user.png';

export const generateMarkerImages = (google: typeof window.google) => {
  const userIcon = {
    url: userImg.src,
    scaledSize: new google.maps.Size(32, 37),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(16, 34),
  };

  const jimmyIcon = {
    url: jimmyImg.src,
    scaledSize: new google.maps.Size(50, 44),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(24, 43),
  };

  return {
    user: userIcon,
    jimmy: jimmyIcon,
  };
};
