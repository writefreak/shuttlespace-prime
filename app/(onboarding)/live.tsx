import ProgressDots from "@/components/onboarding/progressDots";
import { useRouter } from "expo-router";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Request() {
  const router = useRouter();

  return (
    <SafeAreaView edges={["left", "right"]} className="flex-1">
      <ImageBackground
        source={require("../../assets/images/live.jpg")}
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
                View Real-Time location
              </Text>
              <Text className="text-lg  text-neutral-300 w-[17rem]">
                See your driver's current location and track him in real time
              </Text>
            </View>
          </View>
          <View className="pt-2 flex-row items-center justify-between">
            <ProgressDots totalDots={3} activeIndex={1} />
            <View className="flex-row gap-4">
              {btns.map((b) => (
                <TouchableOpacity
                  key={b.id}
                  onPress={() => router.push("/")}
                  className="bg-white rounded-full h-12 w-12 items-center justify-center"
                >
                  {b.icon}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const btns = [
  {
    id: 1,
    icon: (
      <ChevronLeft color={"#003380ff"} strokeWidth={3} height={22} width={22} />
    ),
    url: "/request",
  },
  {
    id: 2,
    icon: (
      <ChevronRight
        color={"#003380ff"}
        strokeWidth={3}
        height={22}
        width={22}
      />
    ),
    url: "/callToAction",
  },
];
