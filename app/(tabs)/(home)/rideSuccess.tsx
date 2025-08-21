import TickIcon from "@/components/home/tickIcon";
import Timer from "@/components/home/timer";
import Button from "@/components/ui/button";
import NavHeader from "@/components/ui/navHeader";
import { router } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RideSuccess() {
  return (
    <SafeAreaView className="bg-white flex-1 ">
      <NavHeader>
        <Text className="text-xl font-semibold text-[#003380ff]">
          Booking Success
        </Text>
      </NavHeader>
      <View className="p-4">
        <View className="pt-20 items-center gap-16">
          <TickIcon />
          <View className="items-center gap-2">
            <Text className="text-xl font-medium text-[#003380ff]">
              Booking Successful
            </Text>
            <Text className=" text-neutral-500">
              Total amount paid via Paystack
            </Text>
          </View>
        </View>
        <View className="pt-10 px-4 gap-10">
          <Timer />
          <View className="gap-4 flex-row">
            <Button
              onPress={() => router.push("/home")}
              className="h-12 items-center justify-center bg-transparent border border-[#003380ff]  flex-1"
            >
              <Text className="text-lg text-[#003380ff]">Back to Home</Text>
            </Button>
            <Button className="h-12 items-center justify-center flex-1">
              <Text className="text-lg">View Live Location</Text>
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
