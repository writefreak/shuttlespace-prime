import NavHeader from "@/components/ui/navHeader";
import { ChevronRight } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { usePaystack } from "react-native-paystack-webview";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Payment() {
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
    <SafeAreaView edges={["top", "right", "left"]} className="bg-white flex-1">
      <NavHeader className="flex-col items-center justify-center ">
        <Text className="text-xl font-semibold text-[#003380ff]">
          Confirm Your Payment
        </Text>
      </NavHeader>

      <View className="px-4 pt-12 gap-6">
        <View className="gap-2 pb-6">
          <Text className="text-2xl font-medium text-[#003380ff]">
            Choose Payment Option
          </Text>
          {/* <Text className="text-lg text-neutral-500 w-80">
            Please choose a payment option to continue with your payment
          </Text> */}
        </View>
        <View className="  pb-5 flex-col gap-6">
          {details.map((d) => (
            <TouchableOpacity
              onPress={paynow}
              key={d.id}
              className="border border-gray-300 rounded-3xl px-7 py-6"
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-4">
                  <Text className="text-xl">{d.desc}</Text>
                </View>
                <ChevronRight color={"gray"} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const details = [
  {
    id: 1,
    desc: "Pay via Paystack",
    url: "/paystack",
  },
  {
    id: 2,
    desc: "Pay via Bank Transfer",
    url: "/rideSuccess",
  },
];
