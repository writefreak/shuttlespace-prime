import NavHeader from "@/components/ui/navHeader";
import { router } from "expo-router";
import { ArrowRight } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RecentTrips() {
  return (
    <SafeAreaView edges={["top", "left", "right"]} className="bg-white flex-1">
      <View>
        <NavHeader>
          <Text className="text-xl font-semibold text-[#003380ff]">
            Upcoming and Recent Rides
          </Text>
        </NavHeader>
      </View>
      <View className="p-4 gap-3">
        <Text className="text-black text-lg font-bold mb-2">Today’s Trips</Text>
        {driver.trips.map((trip) => (
          <View
            key={trip.id}
            className="border border-[#003380ff] rounded-2xl p-5 mb-4 bg-white shadow-sm"
          >
            <View className="gap-3">
              <View className="flex-row items-center gap-2">
                <Text className="text-black font-bold text-base">
                  {trip.location}
                </Text>
                <ArrowRight width={16} height={16} />
                <Text className="text-black font-bold text-base">
                  {trip.destination}
                </Text>
              </View>
              <View className="gap-3">
                <Text className="text-black text-sm">Time: {trip.time}</Text>
                <Text className="text-black text-sm">
                  Passengers: {trip.passengers}
                </Text>
              </View>
            </View>

            <View className="flex-row mt-3 pt-6">
              <TouchableOpacity className="flex-1 bg-[#003380ff] rounded-xl py-3 mr-2">
                <Text className="text-white text-center font-semibold">
                  Start Trip
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 border border-[#003380ff] rounded-xl py-3">
                <Text className="text-black text-center font-semibold">
                  End Trip
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
      <View className="p-4">
        <TouchableOpacity
          onPress={() => router.push("/pendingRides")}
          className=" items-center bg-[#003380ff] h-12 rounded-xl py-3 "
        >
          <Text className="text-white text-xl">See pending</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const driver = {
  name: "John Doe",
  id: "DRV-102",
  phone: "+234 812 345 6789",
  vehicle: {
    id: "SHUT-05",
    type: "Mini Bus",
    plate: "RSU-2345",
    capacity: 14,
  },
  trips: [
    {
      id: 1,
      location: "Maingate",
      destination: "Backgate",
      time: "08:00 AM",
      passengers: 12,
    },
  ],
};
