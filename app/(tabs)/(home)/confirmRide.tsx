import Button from "@/components/ui/button";
import NavHeader from "@/components/ui/navHeader";
import { router } from "expo-router";
import {
  BadgeCheck,
  Car,
  HandCoins,
  MapPin,
  MessageSquareText,
  Phone,
  User,
} from "lucide-react-native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RecentCards() {
  return (
    <ScrollView className="bg-white flex-1">
      <View className="pt-5">
        <NavHeader className="flex-col items-center justify-center ">
          <Text className="text-xl font-semibold text-[#003380ff]">
            Confirm Your Ride
          </Text>
        </NavHeader>
      </View>
      <SafeAreaView
        edges={["top", "left", "right"]}
        className="flex-1  p-4 gap-10"
      >
        <View className="p-6 bg-white border border-neutral-300 rounded-xl ">
          <View className="flex-row items-center justify-between bg-[#003380ff]/10 p-4 rounded-xl">
            <View className="flex-row items-center gap-3">
              <View className="h-14 w-14 bg-[#003380ff] rounded-full flex items-center justify-center">
                <Text className="text-white text-2xl font-medium">H</Text>
              </View>
              <View>
                <Text className="font-medium text-lg">6th Jan 2025</Text>
                <Text className="text-neutral-500 text-sm">
                  Booked at 10:00am
                </Text>
              </View>
            </View>
            {/* <View className="flex-row gap-3">
              {buttons.map((b) => (
                <View
                  key={b.id}
                  className={
                    b.id === 1
                      ? `h-10 w-10 rounded-full border border-[#003380ff] flex items-center justify-center`
                      : "h-10 w-10 rounded-full  flex items-center justify-center bg-[#003380ff]"
                  }
                >
                  <TouchableOpacity>{b.icon}</TouchableOpacity>
                </View>
              ))}
            </View> */}
          </View>

          <View className="pt-8 pb-4">
            <Text className="font-medium text-xl text-[#003380ff]">
              Booking Status
            </Text>
          </View>
          <View className="gap-4">
            {details.map((d) => (
              <View key={d.id} className="flex-row items-center gap-3">
                <View
                  className={
                    "h-14 w-14 rounded-full flex  items-center justify-center bg-[#003380ff]/10"
                  }
                >
                  <TouchableOpacity>{d.icon}</TouchableOpacity>
                </View>
                <View className="flex-row gap-2 items-center">
                  <Text className="font-medium text-lg">{d.slug}:</Text>
                  <Text className="text-neutral-500">{d.value}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        <Button
          onPress={() => router.push("/payment")}
          className="w-full h-12 items-center justify-center"
        >
          <Text className="text-xl">Confirm Ride</Text>
        </Button>
      </SafeAreaView>
    </ScrollView>
  );
}

const buttons = [
  {
    id: 1,
    icon: (
      <MessageSquareText
        height={20}
        width={20}
        color={"white"}
        fill={"#003380ff"}
      />
    ),
  },
  {
    id: 2,
    icon: <Phone height={15} width={15} color={"white"} fill={"white"} />,
  },
];
const progress = [
  {
    id: 1,
    icon: (
      <BadgeCheck
        height={23}
        width={23}
        color={"white"}
        strokeWidth={1}
        fill={"#003380ff"}
      />
    ),
    slug: "Booking confirmed",
  },
  {
    id: 2,
    icon: (
      <BadgeCheck
        height={23}
        width={23}
        color={"white"}
        strokeWidth={1}
        fill={"#003380ff"}
      />
    ),
    slug: "Driver confirmed",
  },
  {
    id: 3,
    icon: (
      <MapPin
        height={23}
        width={23}
        color={"white"}
        strokeWidth={1}
        fill={"#003380ff"}
      />
    ),
    slug: "Destination Reached",
  },
];
const details = [
  {
    id: 1,
    icon: <User color={"#003380ff"} height={23} width={23} />,
    slug: "Driver",
    value: "Heritage",
  },
  {
    id: 2,
    icon: <Car color={"#003380ff"} height={23} width={23} />,
    slug: "Category",
    value: "Shuttle",
  },
  {
    id: 3,
    icon: <MapPin color={"#003380ff"} height={23} width={23} />,
    slug: "Destination",
    value: "MainGate",
  },
  {
    id: 4,
    icon: <HandCoins color={"#003380ff"} height={23} width={23} />,
    slug: "Total Payment ",
    value: "N200",
  },
];
