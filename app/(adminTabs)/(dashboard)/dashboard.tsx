import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Settings } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Dashboard() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [rides, setRides] = useState([
    { id: 1, number: "--", details: "Passengers Active" },
    { id: 2, number: "--", details: "Bookings Completed" },
    { id: 3, number: "--", details: "Drivers Active" },
    { id: 4, number: "--", details: "Shuttles Available" },
  ]);

  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const storedFirstName = await AsyncStorage.getItem("firstName");
        const storedLastName = await AsyncStorage.getItem("lastName");
        if (storedFirstName) {
          setFirstName(storedFirstName);
        }
        if (storedLastName) {
          setFirstName(storedLastName);
        }
      } catch (err) {
        console.error("Error fetching name", err);
      }
    };
    fetch();
  }, []);

  // Fetch stats
  const fetchStats = async () => {
    try {
      const res = await fetch(
        "https://shuttlespace-backend.vercel.app/api/stats"
      );
      const data = await res.json();
      setRides([
        { id: 1, number: data.passengersActive, details: "Passengers Active" },
        {
          id: 2,
          number: data.bookingsCompleted,
          details: "Bookings Completed",
        },
        { id: 3, number: data.activeDrivers, details: "Drivers Active" },
        {
          id: 4,
          number: data.shuttlesAvailable,
          details: "Shuttles Available",
        },
      ]);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch recent activities from backend
  const fetchActivities = async () => {
    try {
      const res = await fetch(
        "https://shuttlespace-backend.vercel.app/api/stats/recentActivities"
      );

      if (!res.ok) {
        console.error("Server returned status", res.status);
        setActivities([]);
        return;
      }

      const data = await res.json();
      // Make sure the response is an array
      const list = Array.isArray(data) ? data : [];
      setActivities(
        list.map((a: any) => ({
          ...a,
          time: timeAgo(a.time), // convert timestamps to friendly text
        }))
      );
    } catch (err) {
      console.error("Failed to fetch activities:", err);
      setActivities([]);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchActivities();
  }, []);

  return (
    <SafeAreaView edges={["top", "left", "right"]} className="bg-white flex-1">
      {/* Greeting */}
      <View className="p-5 pt-14">
        <View className="flex-row items-center justify-between">
          <View className="gap-3">
            <Text className="text-2xl md:text-xl font-semibold">
              Hello, Welcome {firstName}👋
            </Text>
            <Text className="text-lg text-neutral-500">
              View all your dashboard analytics here
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              router.push("/(adminTabs)/(dashboard)/settings/details")
            }
            className="rounded-xl border border-gray-300 p-3"
          >
            <Settings height={20} width={20} strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats + Recent Activities scrollable */}
      <ScrollView>
        <View className="pt-6">
          {/* Stats cards */}
          <View className="p-4 md:p-0 flex flex-row flex-wrap gap-3 items-center justify-center md:justify-start">
            {rides.map((r) => (
              <View
                key={r.id}
                className="rounded-2xl w-[13.6rem] h-32 md:w-[5.1rem] md:h-20 bg-gray-200  justify-center px-8"
              >
                <View className="gap-3 md:gap-1">
                  <Text className="text-3xl font-medium">{r.number}</Text>
                  <Text className="text-lg">{r.details}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Recent Activities */}
          <View className="p-4 pb-6 pt-14 gap-5">
            <View className="gap-3">
              <Text className="text-xl md:text-xl font-semibold">
                Recent Activities
              </Text>
            </View>
            {activities.map((a) => (
              <View
                key={a.id}
                className="h-20 border border-gray-300 rounded-2xl p-4 justify-center"
              >
                <Text>{a.message}</Text>
                <Text className="text-neutral-500 text-sm">{a.time}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// helper to convert timestamp -> "2 mins ago"
function timeAgo(date: string | Date) {
  const now = new Date();
  const past = new Date(date);
  const diff = Math.floor((now.getTime() - past.getTime()) / 1000); // seconds

  if (diff < 60) return `${diff} sec${diff > 1 ? "s" : ""} ago`;
  if (diff < 3600)
    return `${Math.floor(diff / 60)} min${Math.floor(diff / 60) > 1 ? "s" : ""} ago`;
  if (diff < 86400)
    return `${Math.floor(diff / 3600)} hr${Math.floor(diff / 3600) > 1 ? "s" : ""} ago`;
  return `${Math.floor(diff / 86400)} day${Math.floor(diff / 86400) > 1 ? "s" : ""} ago`;
}
