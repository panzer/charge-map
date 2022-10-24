import mgrs from "mgrs";

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

class Region {
  constructor({ lat1, lon1, lat2, lon2 }) {
    this.lat1 = lat1;
    this.lon1 = lon1;
    this.lat2 = lat2;
    this.lon2 = lon2;
  }

  get stringId() {
    return this.getStringIdentifier();
  }

  getStringIdentifier() {}

  getMinimumRegionsForArea({ lat1, lon1, lat2, lon2 }) {}

  *iterateChildRegions() {}
}

export class LatLonRegion extends Region {
  static setPrecision(n, precision) {
    return Math.trunc(parseFloat(n) / precision) * precision;
  }
  constructor({ lat1, lon1, lat2, lon2, precision }) {
    this.lat1 = this.setPrecision(lat1, precision);
    this.lon1 = lon1;
    this.lat2 = lat2;
    this.lon2 = lon2;
  }
}

class MGRSRegion extends Region {
  constructor({ mgrsString }) {
    this.mgrsString = mgrsString;
  }
  getMinimumRegionsForArea({ lat1, lon1, lat2, lon2 }) {
    // determine if both corners are within the same region, if so which
    const mrgs1 = mgrs.forward([lon1, lat1]);
    const mrgs2 = mgrs.forward([lon2, lat2]);
    const commonMgrs = longestCommonPrefix(mgrs1, mrgs2);
  }
  getStringIdentifier() {
    return this.mgrsString;
  }
}
