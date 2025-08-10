import ProgressDots from "@/components/onboarding/progressDots";
import { useRouter } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Request() {
  const router = useRouter();

  return (
    <SafeAreaView edges={["left", "right"]} className="flex-1">
      <ImageBackground
        source={require("../../assets/images/school.jpg")}
        className="flex-1 justify-end"
        resizeMode="cover"
      >
        {/* Overlay for a dark tint (optional) */}
        <View className="absolute inset-0 bg-black/70" />

        {/* Content on top */}
        <View className="  p-4 pb-28">
          <View className="flex-row items-center justify-between">
            <View className="flex-col gap-3 pb-4">
              <Text className="text-3xl font-medium text-white ">
                Request a Ride
              </Text>
              <Text className="text-lg  text-neutral-300 w-[17rem]">
                Request a Ride anywhere on campus to get picked up by a nearby
                driver
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => router.push("/live")}
              className="bg-white rounded-full h-14 w-14 items-center justify-center"
            >
              <ChevronRight
                color={"#003380ff"}
                strokeWidth={3}
                height={25}
                width={25}
              />
            </TouchableOpacity>
          </View>
          <View className="pt-2">
            <ProgressDots totalDots={3} activeIndex={0} />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
