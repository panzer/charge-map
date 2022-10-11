import axios from "axios";

const baseUrl = "https://api.openchargemap.io/v3/";

const authEndpint = baseUrl + "profile/authenticate&key=foo";

export const postAuthentication = ({ email, password }) => {
  return axios.post(authEndpint, { emailaddress: email, password: password });
};

const poiEndpoints = baseUrl + "poi";
export const getLocations = ({ lat1, lon1, lat2, lon2 }) => {
  return axios.get(poiEndpoints, {
    params: {
      boundingbox: `(${lat1},${lon1}),(${lat2},${lon2})`,
      maxresults: 1000,
      compact: true,
      verbose: false,
    },
    headers: {
      "X-API-Key": "0b8e5f47-32aa-4605-87f2-5be585bb4438",
    },
  });
};
