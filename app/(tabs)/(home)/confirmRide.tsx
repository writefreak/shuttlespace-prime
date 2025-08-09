import Button from "@/components/ui/button";
import NavHeader from "@/components/ui/navHeader";
import { router } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ConfirmRide() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <NavHeader className="flex-col items-center justify-center ">
        <Text className="text-xl font-semibold text-[#003380ff]">
          Confirm your Booked Ride
        </Text>
      </NavHeader>
      <View className="p-4 flex-col gap-10">
        <View className="pt-10">
          <Text className="text-2xl font-semibold text-[#003380ff]">
            Booking Details
          </Text>
        </View>
        <View className="flex-col gap-6">
          {booking.map((b) => (
            <View
              key={b.id}
              className="flex-row items-center gap-3 border-b border-neutral-300 rounded-2xl p-4"
            >
              <Text className=" text-xl font-semibold ">{b.title}</Text>
              <Text className="text-lg text-gray-500 justify-end">
                {b.desc}
              </Text>
            </View>
          ))}
          <View className=" flex-col gap-7">
            <View className="flex-row items-center gap-3 rounded-2xl p-4">
              <Text className=" text-xl font-semibold text-[#003380ff]">
                Total Bill:
              </Text>
              <Text className="text-lg text-gray-500 justify-end">N 200</Text>
            </View>
          </View>

          <View className="flex-row w-full gap-4 pt-28">
            {buttonOp.map((b) => (
              <Button
                onPress={() => router.push(b.path as any)}
                key={b.id}
                className={
                  b.id === "Continue"
                    ? `flex-1 py-2  h-12 items-center justify-center`
                    : " flex-1 h-12 items-center justify-center bg-transparent border border-[#003380ff]"
                }
              >
                <Text
                  className={
                    b.id === "Continue" ? `text-lg` : "text-lg text-[#003380ff]"
                  }
                >
                  {b.id}
                </Text>
              </Button>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const buttonOp = [
  {
    id: "Back",
    path: "/ride",
  },
  {
    id: "Continue",
    path: "/payment",
  },
];

const booking = [
  {
    id: 1,
    title: "Student Name:",
    desc: "Endwell Heritage",
  },
  {
    id: 2,
    title: "Current Location:",
    desc: "F&G Hostel",
  },
  {
    id: 3,
    title: "Destination:",
    desc: "Management Building",
  },
  {
    id: 4,
    title: "Destination Category:",
    desc: "Management/Environmental",
  },
  {
    id: 6,
    title: "Ride Category:",
    desc: "Shuttle",
  },
];
