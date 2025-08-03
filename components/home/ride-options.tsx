import { useRouter } from "expo-router";
import { MapPinHouse } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import Bus from "./svg/bus";
import Minibus from "./svg/minibus";
import Shuttle from "./svg/shuttle";

export default function RideOptions() {
  const router = useRouter();
  return (
    <View className="pt-7">
      {/* <Text className="text-2xl md:text-xl font-semibold pb-4 px-4">
        Explore by popular ways
      </Text> */}
      <View className="p-4 md:p-0 flex flex-row flex-wrap gap-3 items-center justify-center md:justify-start">
        {rides.map((r) => (
          <TouchableOpacity
            onPress={() => router.push("/ride")}
            key={r.id}
            className="rounded-2xl w-[13.6rem] h-32 md:w-[5.1rem] md:h-20  bg-gray-100 flex items-center justify-center"
          >
            <View className="flex items-center gap-3 md:gap-1">
              {r.icon}
              <Text className="text-center text-xl md:text-sm">{r.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const rides = [
  {
    id: 1,
    name: "Shuttle",
    icon: <Shuttle className="md:h-7 md:w-7" />,
  },
  {
    id: 2,
    name: "Minibus",
    icon: <Minibus className="md:h-7 md:w-7" />,
  },
  {
    id: 3,
    name: "Bus",
    icon: <Bus className="md:h-7 md:w-7" />,
  },
  {
    id: 4,
    name: "Drop",
    icon: (
      <MapPinHouse
        height={45}
        width={45}
        strokeWidth={1.5}
        className="md:h-7 md:w-7"
      />
    ),
  },
];
