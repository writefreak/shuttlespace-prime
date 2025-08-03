import Available from "@/components/home/available";
import Heading from "@/components/home/heading";
import RideOptions from "@/components/home/ride-options";
import SearchBar from "@/components/home/search-bar";
import Button from "@/components/ui/button";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const router = useRouter();
  return (
    <SafeAreaView edges={["top"]} className="flex-1">
      <View className="bg-white flex-1 pt-8">
        <Heading />
        <SearchBar placeholder="Search for your ride..." />
        <RideOptions />
        <Available />
        <View className="px-4 pt-5">
          <Button
            onPress={() => router.push("/ride")}
            className="w-full flex-row items-center justify-center py-3 bg-[#003380ff]"
          >
            <Text className="text-xl">Schedule a Ride</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
