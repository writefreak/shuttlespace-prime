import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Available() {
  return (
    <View>
      <View className="px-4 pt-9">
        <Text className="text-2xl font-medium">Fresh Picks for You</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 16 }}
        className="pt-7 pb-7"
      >
        {picks.map((p) => (
          <View
            key={p.id}
            className="w-80 rounded-2xl border border-gray-300 bg-white"
          >
            {/* Top section */}
            <View className="flex-row items-center justify-between p-4">
              <View className="flex-row items-center gap-5">
                <View className="h-16 w-16">
                  <Image
                    source={p.img}
                    className="w-full h-full rounded-full"
                  />
                </View>
                <View>
                  <Text className="text-lg font-medium">{p.name}</Text>
                  <Text className="text-neutral-500">{p.cat}</Text>
                </View>
              </View>
            </View>

            {/* Bottom section */}
            <View className="border-t border-gray-200 p-4">
              <View className="flex-row items-center justify-between">
                <Text className="text-neutral-500">Serial Number: {p.id}</Text>
                <TouchableOpacity className="px-3 py-1 w-32 items-center rounded-full bg-[#003380ff]">
                  <Text className="text-white">Book now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const picks = [
  {
    id: "001",
    name: "Endwell Heritage",
    img: require("../../assets/images/heritage-avatar.jpg"),
    cat: "Shuttle",
    badgeDesc: "Ready for Drop",
  },
  {
    id: "002",
    name: "Michael Flourish",
    img: require("../../assets/images/heritage-avatar.jpg"),
    cat: "Minibus",
    badgeDesc: "Ready for Drop",
  },
  {
    id: "003",
    img: require("../../assets/images/heritage-avatar.jpg"),
    cat: "Shuttle",
    name: "John Victory",
    badgeDesc: "Ready for Drop",
  },
  {
    id: "004",
    img: require("../../assets/images/heritage-avatar.jpg"),
    cat: "Shuttle",
    name: "Maxwell James",
    badgeDesc: "Ready for Drop",
  },
  {
    id: "005",
    img: require("../../assets/images/heritage-avatar.jpg"),
    cat: "Shuttle",
    name: "Hart Ezekiel",
    badgeDesc: "Ready for Drop",
  },
];
