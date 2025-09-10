import TickIcon from "@/components/home/tickIcon";
import Timer from "@/components/home/timer";
import Button from "@/components/ui/button";
import NavHeader from "@/components/ui/navHeader";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EventSource from "react-native-sse";

export default function RideSuccess() {
  // explicitly type your params so TS knows what to expect
  const params = useLocalSearchParams<{ bookingId?: string }>();
  const bookingId = params.bookingId ?? "";

  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    if (!bookingId) return;

    const es = new EventSource(
      `https://shuttlespace-backend.vercel.app/api/realtime?bookingId=${bookingId}`
    );

    es.addEventListener("message", (event) => {
      if (!event.data) return;

      try {
        const payload = JSON.parse(event.data as string);
        // adjust field name if necessary (id vs booking_id)
        if (payload?.new?.id === bookingId) {
          setStatus(payload.new.status); // Accepted / Declined / Pending
        }
      } catch (err) {
        console.error("Parse error:", err);
      }
    });

    es.addEventListener("error", (err) => {
      console.error("SSE error:", err);
    });

    return () => {
      es.close();
    };
  }, [bookingId]);

  return (
    <SafeAreaView className="bg-white flex-1">
      <NavHeader>
        <Text className="text-xl font-semibold text-[#003380ff]">
          Booking Success
        </Text>
      </NavHeader>

      <View className="p-4">
        <View className="pt-20 items-center gap-16">
          <TickIcon />
          <View className="items-center gap-2">
            <Text className="text-xl font-medium text-[#003380ff]">
              Booking Successful
            </Text>
            <Text className="text-neutral-500">Total amount paid</Text>
          </View>
        </View>

        <View className="pt-10 px-4 gap-10">
          {/* show timer only if accepted */}
          {status === "Accepted" && <Timer />}

          {status === "Declined" && (
            <Text className="text-red-500 text-center">
              Driver declined your ride
            </Text>
          )}

          <View className="gap-4 flex-row">
            <Button
              onPress={() => router.push("/home")}
              className="h-12 items-center justify-center bg-transparent border border-[#003380ff] flex-1"
            >
              <Text className="text-lg text-[#003380ff]">Back to Home</Text>
            </Button>
            <Button className="h-12 items-center justify-center flex-1">
              <Text className="text-lg">View Live Location</Text>
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
