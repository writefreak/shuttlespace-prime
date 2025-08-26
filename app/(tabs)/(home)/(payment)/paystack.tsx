import { Text, TouchableOpacity, View } from "react-native";
import { usePaystack } from "react-native-paystack-webview";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PaymentScreen() {
  const { popup } = usePaystack();

  const paynow = () => {
    popup.newTransaction({
      email: "Hello@gmail.com",
      amount: 30000,
      reference: `TXN_${Date.now()}`,
      onSuccess: async (res) => {
        console.log("success");
      },
      onCancel: () => {
        console.log("cancel");
      },
      onError: () => {
        console.error("error");
      },
    });
  };
  return (
    <SafeAreaView edges={["top", "left", "right"]} className="bg-white flex-1">
      <View className="items-center justify-center flex-1">
        <Text>HEyyy</Text>
        <TouchableOpacity
          onPress={paynow}
          className="bg-blue-900 w-32 p-2 rounded-md items-center"
        >
          <Text className="text-white text-xl">Pay Here</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

//sk_test_3aad2fef6d2d96f334cde827bf2ccce75a96abbb
