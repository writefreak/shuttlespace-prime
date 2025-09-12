import NavHeader from "@/components/ui/navHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DriverBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);

  // Load driver info from AsyncStorage
  useEffect(() => {
    (async () => {
      const storedFirstName = await AsyncStorage.getItem("firstName");
      const storedLastName = await AsyncStorage.getItem("lastName");
      if (storedFirstName && storedLastName) {
        setFirstName(storedFirstName);
        setLastName(storedLastName);
      }
    })();
  }, []);

  // Fetch bookings from backend
  useEffect(() => {
    async function fetchBookings() {
      try {
        const token = await AsyncStorage.getItem("token"); // add token if your backend requires auth
        const res = await fetch(
          `https://shuttlespace-backend.vercel.app/api/users/bookings`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );

        const data = await res.json();

        // Ensure bookings is always an array
        if (Array.isArray(data)) {
          setBookings(data);
        } else if (data.error) {
          Alert.alert("Error", data.error);
          setBookings([]);
        } else {
          setBookings([]);
        }
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setBookings([]);
      }
    }

    if (firstName) fetchBookings();
  }, [firstName]);

  const handleBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      const token = await AsyncStorage.getItem("token");

      const res = await fetch(
        "https://shuttlespace-backend.vercel.app/api/shuttle/acceptRide",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
          body: JSON.stringify({
            bookingId: bookingId,
            status: newStatus,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        Alert.alert("Error", data.error || "Unable to update booking");
        return;
      }

      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
      );
      Alert.alert("Success", `Booking${newStatus}`);
    } catch (error) {
      console.error("Error updating booking:", error);
      Alert.alert("Error", "Something went wrong");
    }
  };
  return (
    <View className="flex-1 bg-white">
      <View className="pt-5">
        <NavHeader>
          <Text className="text-xl font-bold text-[#003380ff]">
            Pending Bookings
          </Text>
        </NavHeader>
      </View>

      <SafeAreaView className="p-4 bg-white/50">
        <ScrollView className="p-4">
          <View className="items-center justify-center">
            {bookings.length === 0 && <Text>No bookings yet.</Text>}
          </View>

          <View className="gap-4">
            {Array.isArray(bookings) &&
              bookings.map((b: any) => (
                <View
                  key={b.id}
                  className="p-4 bg-white rounded-xl mb-2 gap-6 border border-[#003380ff]"
                >
                  <View className="">
                    <View className="flex-row items-center gap-3">
                      <View className="justify-center h-12 w-12 bg-[#003380ff] rounded-xl items-center gap-3">
                        <Text className="text-2xl font-semibold text-white">
                          {b.passenger?.firstName.charAt(0)}
                        </Text>
                      </View>
                      <Text className=" text-xl font-semibold">
                        {b.passenger?.firstName} {b.passenger?.lastName}
                      </Text>
                    </View>
                    <View className="py-7 gap-4">
                      <View className="flex-row items-center">
                        <Text className="text-lg">Location: </Text>
                        <Text className="text-neutral-600">
                          {b.pickupLocation?.name}
                        </Text>
                      </View>
                      <View className="flex-row items-center">
                        <Text className="text-lg">Destination: </Text>
                        <Text className="text-neutral-600">
                          {b.destination?.name}
                        </Text>
                      </View>
                      <View className="flex-row items-center">
                        <Text className="text-lg">Status: </Text>
                        <Text className="text-neutral-600">{b.status}</Text>
                      </View>
                      <View className="flex-row items-center">
                        <Text className="text-lg">Payment: </Text>
                        <Text className="text-neutral-600">
                          {b.paymentStatus}
                        </Text>
                      </View>
                    </View>
                    <View className="flex-1">
                      <View className="flex-row gap-3">
                        {/* Decline button */}
                        <TouchableOpacity
                          onPress={() => handleBookingStatus(b.id, "Declined")}
                          disabled={b.status === "Declined"} // only lock if already declined
                          className={`border border-[#003380ff] justify-center items-center h-12 rounded-xl flex-1 ${
                            b.status === "Declined" ? "opacity-50" : ""
                          }`}
                        >
                          <Text className="text-[#003380ff] text-lg">
                            {b.status === "Declined" ? "Declined" : "Decline"}
                          </Text>
                        </TouchableOpacity>

                        {/* Accept button */}
                        <View className="flex-1">
                          <TouchableOpacity
                            onPress={() =>
                              handleBookingStatus(b.id, "Accepted")
                            }
                            disabled={b.status === "Accepted"} // only lock if already accepted
                            className={`justify-center items-center h-12 rounded-xl flex-1 ${
                              b.status === "Accepted"
                                ? "bg-[#003380ff]/40" // accepted style
                                : "bg-[#003380ff]" // default style
                            }`}
                          >
                            <Text className="text-white text-lg">
                              {b.status === "Accepted" ? "Accepted" : "Accept"}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
