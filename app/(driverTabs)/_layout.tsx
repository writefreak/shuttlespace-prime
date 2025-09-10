import { Tabs } from "expo-router";
import { Car, MapPin, Settings, User } from "lucide-react-native";

export default function AdminTabLAyout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        // tabBarShowLabel: false,
        tabBarStyle: {
          height: 80,
          // position: "absolute", // allows free positioning
          // bottom: 30, // lifts it 20px above bottom
          // left: 20, // some space on sides
          // right: 20,
          // elevation: 5, // Android shadow
          // backgroundColor: "#fff", // solid bg to float over content
          // borderRadius: 100, // round corners for pill shape
          // shadowColor: "#000", // iOS shadow
          // shadowOffset: { width: 0, height: 10 },
          // shadowOpacity: 0.12,
          // shadowRadius: 10,
        },
      }}
    >
      <Tabs.Screen
        name="(profile)"
        options={{
          headerShown: false,
          title: "Profile",

          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="(location)"
        options={{
          headerShown: false,
          title: "Location",

          tabBarIcon: ({ color, size }) => <MapPin color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="(rides)"
        options={{
          headerShown: false,
          title: "Rides",

          tabBarIcon: ({ color, size }) => <Car color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="(settings)"
        options={{
          headerShown: false,
          title: "Settings",

          tabBarIcon: ({ color, size }) => (
            <Settings color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
