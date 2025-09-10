import Button from "@/components/ui/button";
import NavHeader from "@/components/ui/navHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import { SquarePen } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ConfirmRide() {
  const params = useLocalSearchParams<{
    studentName?: string;
    pickupLocationName?: string;
    destinationName?: string;
    destinationCat?: string;
    rideCategory?: string;
    totalBill?: string;
  }>();

  const {
    pickupLocationName,
    destinationName,
    destinationCat,
    rideCategory,
    totalBill,
  } = params;

  const [studentName, setStudentName] = useState<string | null>(null);

  // Load user's first name from AsyncStorage
  useEffect(() => {
    const loadName = async () => {
      const storedName = await AsyncStorage.getItem("firstName"); // or whatever key you stored it under
      setStudentName(storedName || "Unknown User");
    };
    loadName();
  }, []);

  const booking = [
    { id: 1, title: "Student Name:", desc: studentName },
    { id: 2, title: "Current Location:", desc: pickupLocationName },
    { id: 3, title: "Destination:", desc: destinationName },
    { id: 4, title: "Destination Category:", desc: destinationCat },
    { id: 5, title: "Ride Category:", desc: rideCategory },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <NavHeader className="flex-col items-center justify-center ">
        <Text className="text-xl font-semibold text-[#003380ff]">
          Confirm your Booking Details
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
              <Text className="text-xl font-semibold">{b.title}</Text>
              <Text className="text-lg text-gray-500 justify-end">
                {b.desc}
              </Text>
            </View>
          ))}

          <View className="flex-col gap-2">
            <TouchableOpacity className="px-4 flex-row gap-2 pt-5">
              <SquarePen
                height={21}
                width={21}
                strokeWidth={2}
                color={"gray"}
              />
              <Text className="text-xl text-neutral-500 font-semibold">
                Edit
              </Text>
            </TouchableOpacity>

            <View className="flex-row items-center gap-3 p-4">
              <Text className="text-xl font-semibold text-[#003380ff]">
                Total Bill:
              </Text>
              <Text className="text-lg text-gray-500 justify-end">
                {totalBill ?? "N/A"}
              </Text>
            </View>
          </View>

          <View className="flex-row w-full gap-4 pt-20">
            {buttonOp.map((b) => (
              <Button
                key={b.id}
                onPress={() => {
                  if (b.id === "Continue") {
                    // pass all params to payment page
                    router.push({
                      pathname: "/payment",
                      params: {
                        studentName,
                        pickupLocationName,
                        destinationName,
                        destinationCat,
                        rideCategory,
                        totalBill,
                      },
                    });
                  } else {
                    router.push(b.path as any);
                  }
                }}
                className={
                  b.id === "Continue"
                    ? `flex-1 py-2 h-12 items-center justify-center`
                    : "flex-1 h-12 items-center justify-center bg-transparent border border-[#003380ff]"
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
  { id: "Back", path: "/ride" },
  { id: "Continue", path: "/payment" },
];
