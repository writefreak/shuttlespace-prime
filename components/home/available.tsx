import { Dot } from "lucide-react-native";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Badge from "../ui/badge";

export default function Available() {
  return (
    <View className="p-4 md:p-0 mt-8 md:pb-10">
      <Text className="text-2xl md:text-xl font-semibold pb-7">
        Fresh Picks for You
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row md:flex-col gap-3 md:hidden">
          {picks.map((p) => (
            <TouchableOpacity
              key={p.id}
              className="bg-white border border-neutral-300 w-96 rounded-xl"
            >
              <View className="flex-row items-center gap-7 p-3">
                <View className="w-32 h-32">
                  <Image
                    source={p.img}
                    className="h-full w-full object-cover rounded-xl"
                  />
                </View>
                <View className="flex gap-5">
                  <View className="gap-2">
                    <Text className="text-xl font-semibold">
                      Endwell Heritage
                    </Text>
                    <Text className="text-[15px] text-gray-500">
                      Category: {p.cat}
                    </Text>
                  </View>
                  {/* <Rating /> */}
                  <View className="">
                    <Badge className="flex-row">
                      <Dot />
                      <Text>{p.badgeDesc} </Text>
                    </Badge>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const picks = [
  {
    id: 1,
    img: require("../../assets/images/heritage-avatar.jpg"),
    cat: "Shuttle",
    badgeDesc: "Ready for Drop",
  },
  {
    id: 2,
    img: require("../../assets/images/heritage-avatar.jpg"),
    cat: "Shuttle",
    badgeDesc: "Ready for Drop",
  },
  {
    id: 3,
    img: require("../../assets/images/heritage-avatar.jpg"),
    cat: "Shuttle",
    badgeDesc: "Ready for Drop",
  },
  {
    id: 4,
    img: require("../../assets/images/heritage-avatar.jpg"),
    cat: "Shuttle",
    badgeDesc: "Ready for Drop",
  },
  {
    id: 5,
    img: require("../../assets/images/heritage-avatar.jpg"),
    cat: "Shuttle",
    badgeDesc: "Ready for Drop",
  },
];
