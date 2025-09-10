import SearchBar from "@/components/home/search-bar";
import NavHeader from "@/components/ui/navHeader";
import Select from "@/components/ui/select";
import { router, useLocalSearchParams } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Animated,
  ImageBackground,
  PanResponder,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Ride() {
  const [rideCategory, setrideCategory] = useState<string | null>(null);
  const [destinationCat, setDestinationCat] = useState<string | null>(null);

  const [pickupLocationName, setPickupLocationName] = useState("");
  const [destinationName, setDestinationName] = useState("");
  const handleSelectedRideCat = (value: string) => {
    console.log("Selected option:", value);
    setrideCategory(value);
  };
  const handleDestinationCat = (value: string) => {
    console.log("Selected option:", value);
    setDestinationCat(value);
  };

  //when user clicks on a ride category in home, it automatically selects that category
  const { ride } = useLocalSearchParams<{ ride?: string }>();
  const [selectedRide, setSelectedRide] = useState<string | null>(ride || null);

  const [currentHeight, setCurrentHeight] = useState(120); // keep track of latest height, inc to add initial height
  const height = useRef(new Animated.Value(currentHeight)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        let newHeight = currentHeight - gestureState.dy; // drag up increases height
        if (newHeight < 200) newHeight = 200;
        if (newHeight > 650) newHeight = 650;
        height.setValue(newHeight);
      },
      onPanResponderRelease: (evt, gestureState) => {
        let newHeight = currentHeight - gestureState.dy;
        if (newHeight < 200) newHeight = 200;
        if (newHeight > 650) newHeight = 650;

        // Snap animation
        Animated.spring(height, {
          toValue: newHeight,
          useNativeDriver: false,
        }).start();

        setCurrentHeight(newHeight); // update latest height
      },
    })
  ).current;

  return (
    <View className="flex-1">
      <ImageBackground
        source={require("../../../assets/images/map.png")}
        className="flex-1"
        resizeMode="cover"
      >
        <View>
          <NavHeader>
            <Text className="text-xl font-semibold text-[#003380ff]">
              Book a Ride
            </Text>
          </NavHeader>
        </View>

        <View className="justify-end flex-1">
          {/* Bottom sheet that expands/contracts */}
          <Animated.View
            {...panResponder.panHandlers}
            style={{ height }}
            className="bg-white rounded-t-3xl"
          >
            {/* Drag handle */}
            <View className="w-16 h-1.5 bg-gray-300 rounded-full self-center my-2" />

            <View className="pt-3 pb-3">
              <SearchBar placeholder="What's your destination?..." />
            </View>
            <View className="flex-col gap-7 p-4">
              {inputText.map((i) => (
                <View key={i.id} className="flex-col gap-3">
                  <Text className="">{i.desc}</Text>
                  <TextInput
                    value={
                      i.id === "Location" ? pickupLocationName : destinationName
                    }
                    onChangeText={(text) => {
                      i.id === "Location"
                        ? setPickupLocationName(text)
                        : setDestinationName(text);
                    }}
                    className="py-5 md:py-3 bg-gray-100 px-4 rounded-xl outline-none md:w-full"
                    placeholder={i.desc}
                  />
                </View>
              ))}
            </View>

            <View className="flex-col gap-7  px-4">
              <View className="flex-col gap-3 pt-3">
                <Text className=" ">Destination Category</Text>
                <Select
                  options={[
                    "MainGate",
                    "Backgate",
                    "Law/Science",
                    "Management/Environmental",
                  ]}
                  value={destinationCat}
                  onSelect={handleDestinationCat}
                  placeholder="Select a category for your destination"
                />
              </View>
              <View className="flex-col gap-3">
                <Text className=" ">Ride Category</Text>
                <Select
                  options={["Shuttle", "Bus", "Minivan", "Drop"]}
                  onSelect={(value) => {
                    (setSelectedRide(value), setrideCategory(value));
                  }}
                  value={selectedRide ?? undefined}
                  placeholder="Select your ride option"
                />
              </View>
            </View>

            <View className="flex-row w-full gap-4 pt-14 px-4">
              {buttonOp.map((b) => (
                <TouchableOpacity
                  key={b.id}
                  onPress={() => {
                    if (b.id === "Continue") {
                      // navigate and pass state to the next page
                      router.push({
                        pathname: b.path as any,
                        params: {
                          pickupLocationName,
                          destinationName,
                          destinationCat,
                          rideCategory: selectedRide || rideCategory,
                        },
                      });
                    } else {
                      router.push(b.path as any);
                    }
                  }}
                  className={
                    b.id === "Continue"
                      ? `flex-1 py-2 h-12 items-center justify-center bg-[#003380ff] rounded-xl`
                      : "flex-1 h-12 items-center justify-center bg-transparent border border-[#003380ff] rounded-xl"
                  }
                >
                  <Text
                    className={
                      b.id === "Continue"
                        ? `text-lg text-white`
                        : "text-lg text-[#003380ff]"
                    }
                  >
                    {b.id}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>
        </View>
      </ImageBackground>
    </View>
  );
}

const inputText = [
  { id: "Location", desc: "Please Enter your live location" },
  { id: "Destination", desc: "Please Enter your Destination" },
];

const buttonOp = [
  {
    id: "Back",
    path: "/home",
  },
  {
    id: "Continue",
    path: "/bookingDetails",
  },
];
