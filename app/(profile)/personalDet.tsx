import NavHeader from "@/components/ui/navHeader";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileDet() {
  return (
    <SafeAreaView edges={["top", "left", "right"]} className="flex-1 bg-white">
      <NavHeader>
        <Text className="text-xl font-semibold text-[#003380ff]">
          Your Profile Details
        </Text>
      </NavHeader>

      <View className="p-4">
        <View className="pt-8">
          <Text className="text-xl  font-semibold pb-7">Personal Details</Text>
          <View></View>
        </View>
      </View>
    </SafeAreaView>
  );
}
