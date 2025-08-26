import { Stack } from "expo-router";
import { PaystackProvider } from "react-native-paystack-webview";

export default function PaymentLayout() {
  return (
    <PaystackProvider
      debug
      publicKey="pk_test_d08a3f40c750a0fbaa7548afc1fa2cc719a40419"
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
