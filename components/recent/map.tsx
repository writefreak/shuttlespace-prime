import { Text, View } from "react-native";
import MapView, { UrlTile } from "react-native-maps";

export default function MapContainer() {
  return (
    <View>
      <Text>hhsffffffffffss</Text>
      <MapView
        provider={undefined} // disables Google as the map provider
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 4.8156,
          longitude: 7.0498,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <UrlTile
          urlTemplate="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={19}
        />
      </MapView>
    </View>
  );
}
