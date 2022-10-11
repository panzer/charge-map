import { StyleSheet, Text, Pressable, SafeAreaView } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchChargers,
  selectChargers,
  selectIsChargersLoading,
} from "../redux/chargersReducer";

import { regionToBoundingBox } from "../utils/geographic";

export default function App() {
  const dispatch = useDispatch();
  const [region, setRegion] = useState();

  const chargerLocations = useSelector(selectChargers);
  const isChargersLoading = useSelector(selectIsChargersLoading);

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
          chargerLocations.map(({ uuid, lat, lon }) => (
            <Marker
              key={uuid}
              coordinate={{ latitude: lat, longitude: lon }}
              tracksViewChanges={false}
            />
          ))}
      </MapView>
      <Pressable
        style={styles.button}
        onPress={() => dispatch(fetchChargers(regionToBoundingBox(region)))}
      >
        <Text>Refresh</Text>
      </Pressable>
      {isChargersLoading ? <Text>Loading...</Text> : <Text>Done Loading</Text>}
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
