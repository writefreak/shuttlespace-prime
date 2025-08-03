import { useNavigation } from "@react-navigation/native";
import { ArrowLeft } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  title?: string;
  showBack?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export default function NavHeader({
  title = "",
  showBack = true,
  children,
  className,
}: Props) {
  const navigation = useNavigation();

  return (
    <View className="flex-row items-center gap-4 px-4 pb-3 pt-10 ">
      {showBack && navigation.canGoBack() && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className={`${className}p-1 bg-white h-12 w-12 flex-col items-center justify-center rounded-full border border-[#003380ff]`}
        >
          <ArrowLeft size={24} color="#003380ff" />
        </TouchableOpacity>
      )}

      <Text className="text-lg font-bold text-black">{title}</Text>
      <View className="flex-col items-center justify-center">{children}</View>
    </View>
  );
}
