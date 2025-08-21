import ProgressDots from "@/components/onboarding/progressDots";
import Button from "@/components/ui/button";
import { useRouter } from "expo-router";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { ImageBackground, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CallToAction() {
  const router = useRouter();

  return (
    <SafeAreaView edges={["left", "right"]} className="flex-1">
      <ImageBackground
        source={require("../../assets/images/drive.jpg")}
        className="flex-1 justify-end"
        resizeMode="cover"
      >
        {/* Overlay for a dark tint (optional) */}
        <View className="absolute inset-0 bg-black/70" />

        {/* Content on top */}
        <View className=" p-4 pb-28">
          <View className="">
            <View className="flex-col gap-6 pb-4">
              <Text className="text-3xl font-medium text-white w-[20rem]">
                Need a Quick Ride? We've Got You Covered!
              </Text>
              <View className="pb-2 flex-col gap-5">
                <Button
                  onPress={() => router.push("/signup")}
                  className="w-44 h-10 items-center justify-center"
                >
                  <Text className="text-white text-xl"> Get Started</Text>
                </Button>
              </View>
            </View>
          </View>
          <View className="pt-2 flex-row items-center justify-between">
            <ProgressDots totalDots={3} activeIndex={2} />
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
