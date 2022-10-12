import axios from "axios";

const baseUrl = "https://example.ev.energy/";

const chargeSessionUrl = baseUrl + "chargingsession";

export const beginCharge = ({ user_id = 1, car_id = 1, charger_id }) => {
  return axios.post(chargeSessionUrl, { user: user_id, car_id, charger_id });
};
