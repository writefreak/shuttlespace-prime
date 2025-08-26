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
    <View className="flex-row px-4 pb-3 pt-10  fixed">
      {showBack && navigation.canGoBack() && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className={`${className}p-1 bg-white h-12 w-12 flex-col items-center justify-center rounded-full`}
        >
          <ArrowLeft size={24} color="#003380ff" />
        </TouchableOpacity>
      )}

      <View className="absolute left-0 right-0 top-12 items-center justify-center flex-1">
        <Text>{children}</Text>
      </View>
    </View>
  );
}
