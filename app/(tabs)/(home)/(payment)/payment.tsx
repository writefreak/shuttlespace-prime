import NavHeader from "@/components/ui/navHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { usePaystack } from "react-native-paystack-webview";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Payment() {
  const { popup } = usePaystack();
  const params = useLocalSearchParams<{
    pickupLocationName?: string;
    destinationName?: string;
    destinationCat?: string;
    rideCategory?: string;
  }>();

  const { pickupLocationName, destinationName } = params;

  // Track which button is loading
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const details = [
    { id: 1, desc: "Pay via Paystack", url: "/paystack" },
    { id: 2, desc: "Pay in Person", url: "/rideSuccess" },
  ];

  const handlePayment = async (option: (typeof details)[0]) => {
    if (option.id === 1) {
      // Pay via Paystack
      popup.newTransaction({
        email: "Hello@gmail.com",
        amount: 30000,
        reference: `TXN_${Date.now()}`,
        onSuccess: () => router.push("/rideSuccess"),
        onCancel: () => console.log("cancel"),
        onError: () => console.error("error"),
      });
    } else if (option.id === 2) {
      // Pay in Person
      if (!pickupLocationName || !destinationName) {
        Alert.alert(
          "Missing Information",
          "Cannot book ride without all details."
        );
        return;
      }

      setLoadingId(option.id); // only this button shows loading

      try {
        const token = await AsyncStorage.getItem("token");
        const res = await fetch(
          "https://shuttlespace-backend.vercel.app/api/shuttle/bookRide",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              pickupLocationName,
              destinationName,
              paymentStatus: "unpaid",
            }),
          }
        );

        const data = await res.json();

        if (!res.ok) {
          Alert.alert("Booking Failed", data.error || "Cannot book ride now");
          setLoadingId(null);
          return;
        }

        const bookingId = data.id || data.booking?.id;

        Alert.alert("Success", "Ride booked successfully");
        router.push("/rideSuccess", bookingId);
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Cannot book ride now");
      } finally {
        setLoadingId(null); // stop loading for this button only
      }
    }
  };

  return (
    <SafeAreaView edges={["top", "right", "left"]} className="bg-white flex-1">
      <NavHeader className="flex-col items-center justify-center">
        <Text className="text-xl font-semibold text-[#003380ff]">
          Confirm Your Payment
        </Text>
      </NavHeader>

      <View className="px-4 pt-12 gap-6">
        <View className="gap-2 pb-6">
          <Text className="text-2xl font-medium text-[#003380ff]">
            Choose Payment Option
          </Text>
        </View>

        <View className="pb-5 flex-col gap-6">
          {details.map((d) => (
            <TouchableOpacity
              key={d.id}
              onPress={() => handlePayment(d)}
              className="border border-gray-300 rounded-3xl px-7 py-6 flex-row items-center justify-between"
              disabled={loadingId === d.id} // disable only the clicked button
            >
              <View className="flex-row items-center gap-4">
                <Text className="text-xl">{d.desc}</Text>
              </View>
              {loadingId === d.id ? (
                <ActivityIndicator size="small" color="#003380" />
              ) : (
                <ChevronRight color={"gray"} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}
