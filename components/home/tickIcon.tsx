import { Check } from "lucide-react-native";
import { View } from "react-native";

export default function TickIcon() {
  return (
    <View>
      <View className="w-28 h-28 rounded-full relative bg-[#003380ff]/10 items-center justify-center">
        <View className="w-24 h-24 absolute rounded-full bg-[#003380ff]/20"></View>
        <View className="w-20 h-20 absolute rounded-full bg-[#003380ff]/30"></View>
        <View className="w-16 h-16 absolute rounded-full bg-[#003380ff]/50"></View>
        <View className="w-12 h-12 absolute rounded-full bg-[#003380ff] items-center justify-center">
          <Check color={"white"} />
        </View>
      </View>
    </View>
  );
}
