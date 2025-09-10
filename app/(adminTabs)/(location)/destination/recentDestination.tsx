import NavHeader from "@/components/ui/navHeader";
import { SquarePen, Trash2 } from "lucide-react-native";
import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ViewDestinations() {
  const [Destinations, setDestinations] = useState<
    { id: string; name: string; category: string }[]
  >([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await fetch(
          "https://shuttlespace-backend.vercel.app/api/destination/getDestination"
        );
        const data = await res.json();
        setDestinations(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDestinations();
  }, []);

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      className="flex-1 bg-white p-4"
    >
      <NavHeader>
        <Text className="text-xl text-[#003380ff] font-bold mb-4 text-center">
          All Destinations
        </Text>
      </NavHeader>
      <FlatList
        data={Destinations}
        keyExtractor={(item) => item.id}
        className=""
        renderItem={({ item }) => (
          <View>
            <View className="border border-gray-200 p-4 rounded-xl mb-3 flex-row justify-between">
              <View className="">
                <Text className="font-medium text-lg">{item.name}</Text>
                <Text className="text-gray-500">{item.category}</Text>
              </View>
              <View className="flex-row gap-2 w-28">
                <TouchableOpacity className="h-10 flex-1  rounded-xl items-center justify-center border border-gray-400">
                  {/* <Text className="text-gray-500 text-lg">Edit</Text> */}
                  <SquarePen
                    color={"gray"}
                    strokeWidth={1}
                    height={20}
                    width={20}
                  />
                </TouchableOpacity>
                <TouchableOpacity className="h-10 flex-1 rounded-xl  items-center justify-center bg-red-900">
                  {/* <Text className="text-white text-lg">Delete</Text> */}
                  <Trash2
                    color={"white"}
                    strokeWidth={1}
                    height={20}
                    width={20}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
