import { Stack } from "expo-router";
import { PaystackProvider } from "react-native-paystack-webview";

export default function PaymentLayout() {
  return (
    <PaystackProvider
      debug
      publicKey="pk_live_53c611fb192343498bc18ad911ec3bafd7175c3a"
      currency="NGN"
      defaultChannels={["card", "mobile_money"]}
    >
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="home"
          options={{
            headerShown: false,
            animation: "slide_from_right",
          }}
        />
      </Stack>
    </PaystackProvider>
  );
}
