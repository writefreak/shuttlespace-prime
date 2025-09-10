import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Available() {
  const [picks, setPicks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // fetch drivers just like admin fetches users
  const fetchDrivers = async () => {
    try {
      const response = await fetch(
        "https://shuttlespace-backend.vercel.app/api/users/getDriver" // change to your real endpoint
      );
      if (!response.ok) throw new Error("Failed to fetch drivers");
      const data = await response.json();
      setPicks(data);
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to fetch drivers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#003380ff" />
      </View>
    );
  }

  return (
    <View>
      <View className="px-4 pt-9">
        <Text className="text-2xl font-medium">Fresh Picks for You</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 16 }}
        className="pt-7 pb-7"
      >
        {picks.map((p) => (
          <View
            key={p.id}
            className="w-80 rounded-2xl border border-gray-300 bg-white"
          >
            {/* Top section */}
            <View className="flex-row items-center justify-between p-4">
              <View className="flex-row items-center gap-5">
                <View className="h-16 w-16">
                  <Image
                    source={
                      p.img
                        ? { uri: p.img }
                        : require("../../assets/images/heritage-avatar.jpg")
                    }
                    className="w-full h-full rounded-full"
                  />
                </View>
                <View>
                  <Text className="text-lg font-medium">{p.name}</Text>
                  <Text className="text-neutral-500">{p.cat}</Text>
                  {/* <Text>{p.availability}</Text> */}
                </View>
              </View>
            </View>

            {/* Bottom section */}
            <View className="border-t border-gray-200 p-4">
              <View className="flex-row items-center justify-between">
                <Text className="text-neutral-500">Serial Number: {p.id}</Text>
                <TouchableOpacity className="px-3 py-1 w-32 items-center rounded-full bg-[#003380ff]">
                  <Text className="text-white">Book now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
