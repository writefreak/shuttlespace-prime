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

  const fetchDrivers = async () => {
    try {
      const response = await fetch(
        "https://shuttlespace-backend.vercel.app/api/users/getDriver"
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
        {picks.map((p) => {
          const initial = p.name ? p.name.charAt(0).toUpperCase() : "?";
          return (
            <View
              key={p.id}
              className="w-80 rounded-2xl border border-gray-300 bg-white"
            >
              {/* Top section */}
              <View className="flex-row items-center justify-between p-4">
                <View className="flex-row items-center gap-5">
                  <View className="h-16 w-16 rounded-full overflow-hidden items-center justify-center bg-gray-200">
                    {p.img ? (
                      <Image
                        source={{ uri: p.img }}
                        className="w-full h-full rounded-full"
                      />
                    ) : (
                      <Text className="text-2xl font-bold text-gray-600">
                        {initial}
                      </Text>
                    )}
                  </View>
                  <View>
                    <Text className="text-lg font-medium">{p.name}</Text>
                    <Text className="text-neutral-500">{p.cat}</Text>
                  </View>
                </View>
              </View>

              {/* Bottom section */}
              <View className="border-t border-gray-200 p-4">
                <View className="flex-row items-center justify-between">
                  <Text className="text-neutral-500">
                    Serial Number: {p.id}
                  </Text>
                  <TouchableOpacity className="px-3 py-1 w-32 items-center rounded-full bg-[#003380ff]">
                    <Text className="text-white">Book now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
