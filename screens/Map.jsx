import { StyleSheet, Text, Pressable, SafeAreaView } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchChargers,
  selectChargers,
  selectIsChargersLoading,
} from "../redux/chargersReducer";

import { requestCharge, selectIsStationLoading } from "../redux/stationComms";

import { regionToBoundingBox } from "../utils/geographic";

export default function App() {
  const dispatch = useDispatch();
  const [region, setRegion] = useState();

  const chargerLocations = useSelector(selectChargers);
  const isChargersLoading = useSelector(selectIsChargersLoading);
  const isStationLoading = useSelector(selectIsStationLoading);

  useEffect(() => {
    if (region !== undefined) {
      dispatch(fetchChargers(regionToBoundingBox(region)));
    }
  }, [region]);

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        onRegionChangeComplete={(region) => setRegion(region)}
      >
        {chargerLocations &&
          chargerLocations.map(({ charger_id, uuid, lat, lon }) => (
            <Marker
              key={uuid}
              coordinate={{ latitude: lat, longitude: lon }}
              tracksViewChanges={false}
            >
              <Callout>
                <Text>Station {charger_id}</Text>

                <Pressable
                  // TODO: Change the state of this button (ie disable it) when request is pending
                  onPress={() => dispatch(requestCharge({ charger_id }))}
                >
                  <Text style={styles.button}>Start Charging</Text>
                </Pressable>
              </Callout>
            </Marker>
          ))}
      </MapView>
      <Pressable
        style={styles.button}
        onPress={() => dispatch(fetchChargers(regionToBoundingBox(region)))}
      >
        <Text>Refresh</Text>
      </Pressable>
      {isChargersLoading ? (
        <Text>Loading Map...</Text>
      ) : (
        <Text>Done Loading Map</Text>
      )}
      {isStationLoading ? (
        <Text>Connecting to charger...</Text>
      ) : (
        <Text>Done talking to charger</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    flex: 1,
  },
  button: {
    padding: 20,
    backgroundColor: "lightblue",
  },
});
