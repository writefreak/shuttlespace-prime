import { MenuIcon } from "lucide-react-native";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Sheet from "../ui/sheet";

export default function Menu() {
  const [isSheetVisible, setSheetVisible] = useState(false);

  return (
    <>
      <View className="flex-1 relative items-center justify-center">
        <TouchableOpacity
          onPress={() => setSheetVisible(true)}
          className="h-12 w-12 rounded-xl bg-white shadow-2xl flex items-center justify-center"
        >
          <MenuIcon color={"black"} width={20} height={20} />
        </TouchableOpacity>
      </View>

      {/* Sheet rendered at top-level with absolute fullscreen style */}
      {isSheetVisible && (
        <View className="absolute inset-0 z-50">
          <Sheet
            side="right"
            visible={isSheetVisible}
            onClose={() => setSheetVisible(false)}
            className="bg-white rounded-t-xl w-3/4 shadow-lg"
          >
            <View className="w-3/4">
              <Text className="text-lg font-semibold mb-2">
                Hey, I’m a sheet!
              </Text>
              <Text className="mb-4">
                Swipe me down or tap outside to close.
              </Text>
            </View>
          </Sheet>
        </View>
      )}
    </>
  );
}
