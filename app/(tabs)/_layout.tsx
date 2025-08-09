import { Tabs } from "expo-router";
import { History, House, UserRound } from "lucide-react-native";

export default function TabLayout() {
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
        name="(home)"
        options={{
          headerShown: false,
          title: "Home",

          tabBarIcon: ({ color, size }) => <House color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="recentRides"
        options={{
          headerShown: false,
          title: "Recent",

          tabBarIcon: ({ color, size }) => (
            <History color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",

          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <UserRound color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
