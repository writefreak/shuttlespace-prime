import AsyncStorage from "@react-native-async-storage/async-storage";
import { BadgeCheck, Car, HandCoins, MapPin, User } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavHeader from "../ui/navHeader";

export default function RecentCards() {
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRecentBookings = async () => {
    try {
      setLoading(true);
      // Get JWT token from secure storage
      const token = await AsyncStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const res = await fetch(
        "https://shuttlespace-backend.vercel.app/api/users/recentRides",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch recent bookings");
      const data = await res.json();
      setRecentBookings(data);
    } catch (err) {
      console.error(err);
      setRecentBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentBookings();
  }, []);

  return (
    <View className="bg-white flex-1">
      <View className="pt-2">
        <NavHeader className="flex-col items-center justify-center">
          <Text className="text-xl font-semibold text-[#003380ff]">
            Your Recent Rides
          </Text>
        </NavHeader>
      </View>

      <SafeAreaView
        edges={["top", "left", "right"]}
        className="flex-1 p-4 gap-10"
      >
        {loading ? (
          <ActivityIndicator size="large" color="#003380" />
        ) : recentBookings.length === 0 ? (
          <Text className="text-neutral-500 text-center mt-10">
            No recent bookings available
          </Text>
        ) : (
          <ScrollView className="">
            <View className="gap-6">
              {recentBookings.map((b) => (
                <View
                  key={b.id}
                  className="p-6 bg-white border border-neutral-300 rounded-xl"
                >
                  <View className="flex-row items-center justify-between bg-[#003380ff]/10 p-4 rounded-xl">
                    <View className="flex-row items-center gap-3">
                      <View className="h-14 w-14 bg-[#003380ff] rounded-full flex items-center justify-center">
                        <Text className="text-white text-2xl font-medium">
                          {b.passengerName.charAt(0)}
                        </Text>
                      </View>
                      <View>
                        <Text className="font-medium text-lg">
                          {new Date(b.createdAt).toLocaleDateString()}
                        </Text>
                        <Text className="text-neutral-500 text-sm">
                          Booked at{" "}
                          {new Date(b.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* Booking Details */}
                  <View className="pt-8 flex-col gap-4">
                    <Text className="font-medium text-xl text-[#003380ff]">
                      Booking Details
                    </Text>
                    <View className="flex-col gap-4">
                      <BookingDetail
                        icon={
                          <User color={"#003380ff"} height={23} width={23} />
                        }
                        label={`Passenger: ${b.passengerName}`}
                      />
                      <BookingDetail
                        icon={
                          <Car color={"#003380ff"} height={23} width={23} />
                        }
                        label={`Shuttle: ${b.shuttleCategory}`}
                      />
                      <BookingDetail
                        icon={
                          <MapPin color={"#003380ff"} height={23} width={23} />
                        }
                        label={`Destination: ${b.destination}`}
                      />
                      <BookingDetail
                        icon={
                          <MapPin color={"#003380ff"} height={23} width={23} />
                        }
                        label={`Pickup: ${b.pickupLocation}`}
                      />
                      <BookingDetail
                        icon={
                          <HandCoins
                            color={"#003380ff"}
                            height={23}
                            width={23}
                          />
                        }
                        label={`Payment: ${b.paymentStatus || "Pending"}`}
                      />
                    </View>

                    {/* Booking Status */}
                    <View className="pt-8 flex-col gap-4">
                      <Text className="font-medium text-xl text-[#003380ff]">
                        Booking Status
                      </Text>
                      <View className="flex-col gap-4">
                        <StatusBadge slug={b.status} />
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    </View>
  );
}

// Booking detail row
const BookingDetail = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => (
  <View className="flex-row items-center gap-3">
    <View className="h-14 w-14 rounded-full flex items-center justify-center bg-[#003380ff]/10">
      <TouchableOpacity>{icon}</TouchableOpacity>
    </View>
    <View>
      <Text className="font-medium text-lg">{label}</Text>
    </View>
  </View>
);

// Booking status badge
const StatusBadge = ({ slug }: { slug: string }) => {
  let icon = (
    <BadgeCheck
      height={23}
      width={23}
      color={"white"}
      strokeWidth={1}
      fill={"#003380ff"}
    />
  );
  if (slug.toLowerCase() === "completed")
    icon = (
      <MapPin
        height={23}
        width={23}
        color={"white"}
        strokeWidth={1}
        fill={"#003380ff"}
      />
    );

  return (
    <View className="flex-row items-center gap-3">
      <View className="h-14 w-14 rounded-full flex items-center justify-center bg-[#003380ff]/10">
        <TouchableOpacity>{icon}</TouchableOpacity>
      </View>
      <View>
        <Text className="font-medium text-lg">{slug}</Text>
      </View>
    </View>
  );
};
