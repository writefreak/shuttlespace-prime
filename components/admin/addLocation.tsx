import { router } from "expo-router";
import { MapPin } from "lucide-react-native";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../home/search-bar";
import Select from "../ui/select";

export default function AddLocation() {
  const [name, setName] = useState(""); // for location name
  const [category, setCategory] = useState(""); // for category
  const [loading, setLoading] = useState(false);

  const handleLocation = async () => {
    if (!name.trim() || !category.trim()) {
      Alert.alert("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://shuttlespace-backend.vercel.app/api/location/addLocation",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            category,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Location added successfully");
        setName("");
        setCategory("");
        console.log("Added location:", data);
      } else {
        Alert.alert("Error", data.error || "Something went wrong");
      }
    } catch (err) {
      console.error("Network or server error:", err);
      Alert.alert("Please try again, network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <View className="bg-white rounded-t-3xl">
        <View className="px-4 pt-7 flex-col items-center gap-3 pb-5">
          <MapPin />
          <View>
            <Text className="font-medium text-xl text-center">
              Add A Location
            </Text>
            <Text className="text-neutral-500 text-center w-56">
              Users can search from the list of available campus locations
            </Text>
          </View>
        </View>

        <View className="pt-3 pb-3">
          <SearchBar placeholder="What's your destination?..." />
        </View>

        <View className="flex-col gap-7 p-4">
          <Text>Enter Location Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Enter location name"
            className="py-5 bg-gray-100 px-4 rounded-xl outline-none md:w-full"
          />
        </View>

        <View className="flex-col gap-7 px-4">
          <Text>Destination Category</Text>
          <Select
            options={["Backate", "Maingate", "Management", "Law/Science"]}
            onSelect={setCategory}
            placeholder="Select category"
          />

          <View className="">
            <TouchableOpacity
              onPress={handleLocation}
              className="bg-[#003380ff] items-center h-12 justify-center rounded-xl mt-4"
            >
              <Text className="text-white text-lg">
                {loading ? "Adding Location..." : "Add Location"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/recentLocation")}
              className="bg-[#003380ff] items-center h-12 justify-center rounded-xl mt-4"
            >
              <Text className="text-white text-lg">View All Locations</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
