import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { Plus, User, UserRound } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileDet() {
  const [editingId, setEditingId] = useState<number | null>(null);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    role: "",
    image: "",
    id: "",
    serialNumber: "", // ✅ new
    vehicleType: "", // ✅ new
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedName = await AsyncStorage.getItem("firstName");
        const storedEmail = await AsyncStorage.getItem("email");
        const storedRole = await AsyncStorage.getItem("role");
        const storedImage = await AsyncStorage.getItem("image");
        const storedId = await AsyncStorage.getItem("id");
        const storedSerial = await AsyncStorage.getItem("vehicleSerialNo");
        const storedVehicle = await AsyncStorage.getItem("vehicleType");

        setUserData({
          name: storedName || "N/A",
          email: storedEmail || "N/A",
          role: storedRole || "N/A",
          image: storedImage || "",
          id: storedId || "",
          serialNumber: storedSerial || "N/A",
          vehicleType: storedVehicle || "N/A",
        });
      } catch (error) {
        console.error("Failed to fetch user data from AsyncStorage:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (key: keyof typeof userData, text: string) => {
    setUserData((prev) => ({
      ...prev,
      [key]: text,
    }));
  };

  const pickImageAndUpload = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        quality: 1,
      });

      if (result.canceled) return;

      const uri = result.assets[0].uri;
      const fileName = uri.split("/").pop() || "profile.jpg";

      const blob = await (await fetch(uri)).blob();

      const formData = new FormData();
      formData.append("file", {
        uri,
        name: fileName,
        type: blob.type || "image/jpeg",
      } as any);

      setLoading(true);

      const res = await fetch(
        "https://shuttlespace-backend.vercel.app/api/users/uploads",
        {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const data = await res.json();

      if (res.ok && data.url) {
        setUserData((prev) => ({ ...prev, image: data.url }));
        await AsyncStorage.setItem("image", data.url);
      } else {
        Alert.alert("Upload failed", data.error || "Unknown error");
      }
    } catch (err) {
      console.error("Upload error:", err);
      Alert.alert("Upload error", "Something went wrong during upload.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Added the two new fields here:
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
    {
      id: 4,
      title: "Serial Number:",
      desc: userData.serialNumber,
      key: "serialNumber" as keyof typeof userData,
    },
    {
      id: 5,
      title: "Vehicle Type:",
      desc: userData.vehicleType,
      key: "vehicleType" as keyof typeof userData,
    },
  ];

  return (
    <SafeAreaView edges={["top", "left", "right"]} className="flex-1 bg-white">
      {/* <NavHeader>
        <Text className="text-xl font-semibold text-[#003380ff]">
          Your Profile Details
        </Text>
      </NavHeader> */}

      <View className="p-4">
        <View className="pt-8">
          <View className="pt-5 items-center gap-3">
            <User />
            <Text className="text-xl font-semibold pb-7">Personal Details</Text>
          </View>
          <View className="h-52 border border-gray-300 rounded-xl items-center justify-center gap-4">
            <View>
              <View className="relative">
                <TouchableOpacity onPress={pickImageAndUpload}>
                  <View className="h-20 w-20 rounded-full bg-gray-200 flex-row items-center justify-center">
                    {userData.image ? (
                      <Image
                        source={{ uri: userData.image }}
                        style={{ width: 80, height: 80, borderRadius: 40 }}
                      />
                    ) : (
                      <UserRound
                        fill={"gray"}
                        strokeWidth={0}
                        height={30}
                        width={30}
                      />
                    )}
                  </View>
                  <View className="h-8 w-8 rounded-full bg-[#003380ff] flex-row items-center justify-center absolute left-14 top-12">
                    <Plus color={"white"} height={16} width={16} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View className="items-center">
              <Text className="text-xl font-medium">
                {userData.image
                  ? "Change profile picture"
                  : "Add a profile picture"}
              </Text>
              <Text className="text-gray-500">
                That's how passengers can identify you
              </Text>
            </View>
            {loading && <ActivityIndicator size="small" color="#003380ff" />}
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
