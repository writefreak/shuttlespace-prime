import {
  ChevronRight,
  HandCoins,
  History,
  LogOut,
  Settings,
  SquarePen,
  Trash,
} from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AddUser from "../ui/addUser";

export default function ProfileList() {
  return (
    <SafeAreaView className="">
      <View className="flex-col items-center pt-7">
        <AddUser className="rounded-full h-32 w-32" />
        <View className="flex-col gap-2 items-center">
          <Text className="text-3xl font-semibold text-[#003380ff]">
            Endwell Heritage
          </Text>
          <Text className="text-xl text-gray-500">Student</Text>
        </View>
      </View>
      <View className="px-4 pt-12 pb-5 flex-col gap-6">
        {details.map((d) => (
          <TouchableOpacity
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
    desc: "Edit Personal Details",
    icon: <SquarePen color={"gray"} />,
  },
  {
    id: 2,
    desc: "Settings & Security",
    icon: <Settings color={"gray"} />,
  },
  {
    id: 3,
    desc: "Booking History",
    icon: <History color={"gray"} />,
  },
  {
    id: 4,
    desc: "Payment Info",
    icon: <HandCoins color={"gray"} />,
  },
  {
    id: 5,
    desc: "Log Out",
    icon: <LogOut color={"gray"} />,
  },
  {
    id: 6,
    desc: "Delete Account",
    icon: <Trash color={"gray"} />,
  },
];
