import { Stack } from "expo-router";

export default function driverLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="driver"
        options={{
          headerShown: false,
          animation: "slide_from_left",
        }}
      />
    </Stack>
  );
}
