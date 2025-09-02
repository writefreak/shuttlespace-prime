import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import {
  ChevronRight,
  HandCoins,
  History,
  LogOut,
  Settings,
  Trash,
  User,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileList() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    role: "",
    image: "", // Add image field
    id: "", // store user id for upload
  });

  useEffect(() => {
    const fetch = async () => {
      try {
        const storedFirstName = await AsyncStorage.getItem("firstName");
        const storedLastName = await AsyncStorage.getItem("lastName");
        const storedRole = await AsyncStorage.getItem("role");
        const storedImage = await AsyncStorage.getItem("image"); // <--- fetch stored image

        if (storedFirstName) setFirstName(storedFirstName);
        if (storedLastName) setFirstName(storedLastName);
        if (storedRole) setRole(storedRole);
        if (storedImage)
          setUserData((prev) => ({ ...prev, image: storedImage })); // <--- set image
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetch();
  }, []);

  return (
    <SafeAreaView className="">
      <View className="flex-col items-center pt-10 gap-8">
        <TouchableOpacity className="pt-10">
          <View className="h-28 w-28 rounded-full bg-gray-200 flex-row items-center justify-center">
            {userData.image && (
              <Image
                source={{ uri: userData.image }}
                style={{ width: 100, height: 100, borderRadius: 100 }}
              />
            )}
          </View>
        </TouchableOpacity>
        <View className="flex-col gap-2 items-center">
          <Text className="text-3xl font-semibold text-[#003380ff]">
            {firstName}
          </Text>
          <Text className="text-xl text-gray-500">{role}</Text>
        </View>
      </View>
      <View className="px-4 pt-12 pb-5 flex-col gap-6">
        {details.map((d) => (
          <TouchableOpacity
            onPress={() => router.push(d.link as any)}
            key={d.id}
            className="border border-gray-300 rounded-3xl px-7 py-6"
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-4">
                {d.icon}
                <Text className="text-xl">{d.desc}</Text>
              </View>
              <ChevronRight color={"gray"} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const details = [
  {
    id: 1,
    desc: "View Personal Details",
    icon: <User color={"gray"} />,
    link: "/(profile)/personalDet",
  },
  {
    id: 2,
    desc: "Settings & Security",
    icon: <Settings color={"gray"} />,
    link: "",
  },
  {
    id: 3,
    desc: "Booking History",
    icon: <History color={"gray"} />,
    link: "",
  },
  {
    id: 4,
    desc: "Payment Info",
    icon: <HandCoins color={"gray"} />,
    link: "",
  },
  {
    id: 5,
    desc: "Log Out",
    icon: <LogOut color={"gray"} />,
    link: "/login",
  },
  {
    id: 6,
    desc: "Delete Account",
    icon: <Trash color={"gray"} />,
    link: "",
  },
];
