import {
  BadgeCheck,
  Car,
  HandCoins,
  MapPin,
  MessageSquareText,
  Phone,
  User,
} from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavHeader from "../ui/navHeader";

export default function RecentCards() {
  return (
    <View className="bg-white flex-1">
      <NavHeader className="flex-col items-center justify-center ">
        <Text className="text-xl font-semibold text-[#003380ff]">
          Recent Rides
        </Text>
      </NavHeader>
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
          <View className="pt-8 flex-col gap-4">
            <Text className="font-medium text-xl text-[#003380ff]">
              Booking Details
            </Text>
            <View>
              <View className="flex-col gap-4">
                {details.map((d) => (
                  <View className="flex-row items-center gap-3">
                    <View
                      key={d.id}
                      className={
                        "h-14 w-14 rounded-full flex  items-center justify-center bg-[#003380ff]/10"
                      }
                    >
                      <TouchableOpacity>{d.icon}</TouchableOpacity>
                    </View>
                    <View>
                      <Text className="font-medium text-lg">{d.slug}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
            <View className="flex-col gap-4 pt-8">
              <Text className="font-medium text-xl text-[#003380ff]">
                Booking Status
              </Text>
              <View>
                <View className="flex-col gap-4">
                  {progress.map((p) => (
                    <View className="flex-row items-center gap-3">
                      <View
                        key={p.id}
                        className={
                          p.id === 3
                            ? "h-14 w-14 rounded-full flex border border-[#003380ff] items-center justify-center bg-[#003380ff]/10"
                            : "h-14 w-14 rounded-full flex items-center justify-center bg-[#003380ff]/10"
                        }
                      >
                        <TouchableOpacity>{p.icon}</TouchableOpacity>
                      </View>
                      <View>
                        <Text className="font-medium text-lg">{p.slug}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
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
    slug: "Driver: Heritage",
  },
  {
    id: 2,
    icon: <Car color={"#003380ff"} height={23} width={23} />,
    slug: "Category: Shuttle",
  },
  {
    id: 3,
    icon: <MapPin color={"#003380ff"} height={23} width={23} />,
    slug: "Destination: MainGate",
  },
  {
    id: 4,
    icon: <HandCoins color={"#003380ff"} height={23} width={23} />,
    slug: "Total Payment: N200",
  },
];
