import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";

import store from "./redux/store";
import Map from "./screens/Map";

export default function App() {
  return (
    <Provider store={store}>
      <Map />
      <StatusBar style="auto" />
    </Provider>
  );
}
