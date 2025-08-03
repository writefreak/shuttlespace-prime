import { Plus, UserRound } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  className?: string;
}

export default function AddUser({ className }: Props) {
  return (
    <SafeAreaView className=" ">
      <View className="relative">
        <View
          className={`${className}
            h-20 w-20 rounded-full bg-gray-200 flex-row items-center justify-center`}
        >
          <UserRound fill={"gray"} strokeWidth={0} height={30} width={30} />
        </View>
        <TouchableOpacity className="h-8 w-8 rounded-full bg-[#003380ff] flex-row items-center justify-center absolute left-24 ">
          <Plus color={"white"} height={16} width={16} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
