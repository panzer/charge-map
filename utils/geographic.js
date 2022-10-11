// Utilities related to latitudes, longitudes, etc.

export const regionToBoundingBox = ({
  latitude,
  longitude,
  latitudeDelta,
  longitudeDelta,
}) => {
  // Converts react-native-maps format region into a upper left point and lower right point
  // This DOES NOT work in every case because lat/lons are weird.
  // Read more: https://github.com/react-native-maps/react-native-maps/issues/356

  const northLat = latitude + latitudeDelta / 2; // max lat
  const westLng = longitude - longitudeDelta / 2; // minimum lng
  const southLat = latitude - latitudeDelta / 2; // min lat
  const eastLng = longitude + longitudeDelta / 2; // max lng
  return { lat1: northLat, lon1: westLng, lat2: southLat, lon2: eastLng };
};

export const regionToZoomLevel = ({
  latitude,
  longitude,
  latitudeDelta,
  longitudeDelta,
}) => {
  // Arbitrary calculation. Something like this could prove helpful in limiting how zoomed out the user can be and still request new results
  return 20 / longitudeDelta;
};
