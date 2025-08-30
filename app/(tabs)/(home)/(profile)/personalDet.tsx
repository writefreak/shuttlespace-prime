import NavHeader from "@/components/ui/navHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Plus, UserRound } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileDet() {
  const [editingId, setEditingId] = useState<number | null>(null);

  // Use a single state object for user data
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    role: "",
  });

  // useEffect to fetch all user data from AsyncStorage
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedName = await AsyncStorage.getItem("firstName");
        const storedEmail = await AsyncStorage.getItem("email");
        const storedRole = await AsyncStorage.getItem("role");

        // Update the state with fetched data, using a default if not found
        setUserData({
          name: storedName || "N/A",
          email: storedEmail || "N/A",
          role: storedRole || "N/A",
        });
      } catch (error) {
        console.error("Failed to fetch user data from AsyncStorage:", error);
      }
    };

    fetchUserData();
  }, []);

  // Handle changes to any text input field
  const handleChange = (key: keyof typeof userData, text: string) => {
    setUserData((prev) => ({
      ...prev,
      [key]: text,
    }));
  };

  // Dynamically create the fields array from the userData state
  const fields = [
    {
      id: 1,
      title: "Name:",
      desc: userData.name,
      key: "name" as keyof typeof userData,
    },
    {
      id: 2,
      title: "Email:",
      desc: userData.email,
      key: "email" as keyof typeof userData,
    },
    {
      id: 3,
      title: "Role:",
      desc: userData.role,
      key: "role" as keyof typeof userData,
    },
  ];

  return (
    <SafeAreaView edges={["top", "left", "right"]} className="flex-1 bg-white">
      <NavHeader>
        <Text className="text-xl font-semibold text-[#003380ff]">
          Your Profile Details
        </Text>
      </NavHeader>

      <View className="p-4">
        <View className="pt-8">
          <Text className="text-xl font-semibold pb-7">Personal Details</Text>
          <View className="h-52 border border-gray-300 rounded-xl items-center justify-center gap-4">
            <View>
              <View className="relative">
                <View
                  className={`
            h-20 w-20 rounded-full bg-gray-200 flex-row items-center justify-center`}
                >
                  <UserRound
                    fill={"gray"}
                    strokeWidth={0}
                    height={30}
                    width={30}
                  />
                </View>
                <TouchableOpacity
                  className={`h-8 w-8 rounded-full bg-[#003380ff] flex-row items-center justify-center absolute left-14 `}
                >
                  <Plus color={"white"} height={16} width={16} />
                </TouchableOpacity>
              </View>
            </View>
            <View className="items-center">
              <Text className="text-xl font-medium">Add a profile picture</Text>
              <Text className="text-gray-500">
                That's how your driver can identify you
              </Text>
            </View>
          </View>
        </View>

        <View className="pt-9 gap-4">
          {fields.map((b) => (
            <TouchableOpacity
              key={b.id}
              className="flex-row items-center gap-3 border-b border-neutral-300 rounded-2xl p-4"
              activeOpacity={1}
              onPress={() => setEditingId(b.id)}
            >
              <Text className="text-lg font-medium">{b.title}</Text>

              {editingId === b.id ? (
                <TextInput
                  value={b.desc}
                  onChangeText={(text) => handleChange(b.key, text)}
                  onBlur={() => setEditingId(null)}
                  autoFocus
                  className="flex-1 text-gray-700 text-lg"
                />
              ) : (
                <Text className="text-gray-500 flex-1">{b.desc}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}
