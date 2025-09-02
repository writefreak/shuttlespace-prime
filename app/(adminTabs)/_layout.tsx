import { Tabs } from "expo-router";
import { ChartLine, LayoutDashboard, MapPin, Users } from "lucide-react-native";

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
        name="(dashboard)"
        options={{
          headerShown: false,
          title: "Dashboard",

          tabBarIcon: ({ color, size }) => (
            <LayoutDashboard color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="users"
        options={{
          headerShown: false,
          title: "Users",

          tabBarIcon: ({ color, size }) => <Users color={color} size={size} />,
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
        name="analytics"
        options={{
          title: "Analytics",

          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <ChartLine color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
