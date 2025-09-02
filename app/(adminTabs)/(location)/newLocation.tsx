import AddLocation from "@/components/admin/addLocation";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NewLocation() {
  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      className="bg-white flex-1 p-4"
    >
      <View>
        <AddLocation />
      </View>
    </SafeAreaView>
  );
}
