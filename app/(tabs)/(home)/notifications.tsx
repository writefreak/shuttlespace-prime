import NavHeader from "@/components/ui/navHeader";
import { Ban, BanknoteArrowDown, MapPin } from "lucide-react-native";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Notifications() {
  return (
    <SafeAreaView edges={["top", "left", "right"]} className="bg-white flex-1">
      <View>
        <NavHeader>
          <Text className="text-xl font-semibold text-[#003380ff]">
            Notifications
          </Text>
        </NavHeader>
      </View>
      <ScrollView>
        <View>
          {days.map((y) => (
            <View key={y.day} className="p-4 gap-4 pt-9">
              <Text className="text-xl font-medium text-neutral-500">
                {y.day}
              </Text>
              <View className="gap-4">
                {data.map((d) => (
                  <View
                    key={d.id}
                    className="p-4 flex-row items-center gap-5 border border-gray-300 rounded-3xl px-7 py-4"
                  >
                    <View className="h-14 w-14 rounded-xl bg-[#003380ff]/30 flex items-center justify-center">
                      {d.icon}
                    </View>
                    <View className="flex-1">
                      <Text className="text-lg font-medium">{d.title}</Text>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        className="text-neutral-600"
                      >
                        {d.slug}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const data = [
  {
    id: 1,
    icon: <MapPin color={"#003380ff"} />,
    title: "Driver Has Arrived",
    slug: " Your driver has arrived between 10am-10:03am",
  },
  {
    id: 2,
    icon: <Ban color={"#003380ff"} />,
    title: "You cancelled your ride",
    slug: " Your You cancelled your ride between 10am-10:03am",
  },
  {
    id: 3,
    icon: <BanknoteArrowDown color={"#003380ff"} />,
    title: "Booking Payment successful",
    slug: " Your booking payment was successful",
  },
];

const days = [
  {
    day: "Today",
  },
  {
    day: "Yesterday",
  },
  {
    day: "13th August, 2025",
  },
];
