import { Search } from "lucide-react-native";
import { TextInput, TouchableOpacity, View } from "react-native";

interface Props {
  placeholder?: string;
}

export default function SearchBar({ placeholder }: Props) {
  return (
    <View className="p-4 md:p-0 md:pt-8 flex">
      <View className=" bg-gray-100 w-full md:rounded-xl rounded-2xl flex flex-row items-center justify-between px-5">
        <TextInput
          className="py-5 md:py-3 outline-none md:w-full"
          placeholder={placeholder}
        />
        <TouchableOpacity>
          <Search color={"black"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
