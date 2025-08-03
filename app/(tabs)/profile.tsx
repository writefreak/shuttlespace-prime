import ProfileList from "@/components/profile/profileList";
import AddUser from "@/components/ui/addUser";
import { View } from "react-native";

export default function Profile() {
  return (
    <View className="flex-1 bg-white rounded-t-3xl">
      <View className="">
        <ProfileList />
      </View>
    </View>
  );
}
