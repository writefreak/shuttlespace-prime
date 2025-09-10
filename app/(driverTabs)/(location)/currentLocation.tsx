import NavHeader from "@/components/ui/navHeader";
import Select from "@/components/ui/select";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MapPin } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CurrentLocation() {
  const [selectedCategory, setSelectedCategory] = useState("Maingate");
  const [loading, setLoading] = useState(false); // ✅ loading state

  // Load saved category from AsyncStorage
  useEffect(() => {
    const loadCategory = async () => {
      try {
        const savedCategory = await AsyncStorage.getItem("currentCategory");
        if (savedCategory) setSelectedCategory(savedCategory);
      } catch (err) {
        console.error("Failed to load category from AsyncStorage", err);
      }
    };

    loadCategory();
  }, []);

  // Update category in DB and AsyncStorage
  const updateCategory = async () => {
    setLoading(true); // start loading
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Alert.alert("Error", "No auth token found");
        setLoading(false);
        return;
      }

      console.log(
        "Updating category:",
        selectedCategory,
        `"${selectedCategory}"`
      );

      const res = await fetch(
        "https://shuttlespace-backend.vercel.app/api/users/patch",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ currentCategory: selectedCategory }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        Alert.alert("Error", data.error || "Failed to update location");
        setLoading(false);
        return;
      }

      await AsyncStorage.setItem(
        "currentCategory",
        data.driver.currentCategory
      );

      Alert.alert(
        "Success",
        `Your location is now set to ${data.driver.currentCategory}`
      );
      setSelectedCategory(data.driver.currentCategory);
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Something went wrong while updating location");
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <View className="flex-1 bg-white">
      <View className="pt-5">
        <NavHeader>
          <Text className="text-xl font-semibold text-[#003380ff]">
            Your chosen Location
          </Text>
        </NavHeader>
      </View>
      <View className="justify-center">
        <SafeAreaView className="bg-white p-4" edges={["right", "left", "top"]}>
          <View className="bg-white gap-10">
            <View className="border border-gray-300 rounded-xl p-4">
              <View className="border-b border-b-gray-300 flex-row items-center gap-3 py-3">
                <View className="h-10 w-10 rounded-full border border-gray-300 items-center justify-center">
                  <View className="h-2 w-2 rounded-full bg-black"></View>
                </View>
                <Text className="text-xl font-medium">{selectedCategory}</Text>
              </View>
              <View className="py-3 flex-row items-center gap-3">
                <View className="h-10 w-10 rounded-full border border-gray-300 items-center justify-center">
                  <MapPin height={15} width={15} />
                </View>
                <View className="flex-1">
                  <Select
                    options={[
                      "Maingate",
                      "Backgate",
                      "Law/Science",
                      "Environmental",
                    ]}
                    onSelect={(value) => setSelectedCategory(value)}
                  />
                </View>
              </View>
            </View>

            <View>
              <TouchableOpacity
                className="bg-[#003380ff] items-center justify-center h-12 rounded-xl"
                onPress={updateCategory}
                disabled={loading} // disable button during loading
              >
                {loading ? (
                  <ActivityIndicator color="white" /> // show spinner instead of text
                ) : (
                  <Text className="text-white text-xl">Update Location</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
}
