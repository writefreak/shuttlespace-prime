import SearchBar from "@/components/home/search-bar";
import Button from "@/components/ui/button";
import NavHeader from "@/components/ui/navHeader";
import Select from "@/components/ui/select";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Ride() {
  const handleSelect = (value: string) => {
    console.log("Selected option:", value);
  };

  const [pickupLocationId, setPickupLocationId] = useState("");
  const [destinationId, setDestinationId] = useState("");
  const [driverId, setDriverId] = useState("");
  const [destinationCat, setDestinationCat] = useState("");
  const [rideCategory, setrideCategory] = useState("");

  const handleBooking = async () => {
    try {
      const res = await fetch(
        "https://shuttlespace-backend.vercel.app/api/shuttle/bookRide",
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            pickupLocationId,
            destinationId,
            driverId,
            destinationCat,
            rideCategory,
          }),
        }
      );

      if (
        !pickupLocationId ||
        !destinationId ||
        !destinationCat ||
        !rideCategory
      ) {
        return Alert.alert("Error", "Please fill all fields before booking");
      }
      const data = await res.json();
      if (!res.ok) return Alert.alert("Error", data.error);

      Alert.alert("Success", "Ride booked successfully!");
      router.push("/bookingDetails");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      <NavHeader className="flex-col items-center justify-center">
        <Text className="text-xl font-semibold text-[#003380ff]">
          Book a Ride
        </Text>
      </NavHeader>
      <ScrollView>
        <View className="pt-5">
          <SearchBar placeholder="Where to? (Search for your desired location)" />
          <View className="px-4">
            <View className="h-72 flex-col items-center justify-center bg-gray-100 rounded-xl">
              <Text className="text-2xl">Sorry, No Maps Shown Here</Text>
            </View>
            <View className="py-8">
              <Text className="text-2xl font-semibold text-[#003380ff]">
                Please fill in the following details
              </Text>
            </View>
            <View className="flex-col gap-10">
              {inputText.map((i) => (
                <View key={i.id} className="flex-col gap-3">
                  <Text className="text-lg">{i.desc}</Text>
                  <TextInput
                    className="py-5 md:py-3 bg-gray-100 px-4 rounded-xl outline-none md:w-full"
                    placeholder="Please enter your current location"
                  />
                </View>
              ))}

              <View className="flex-col gap-10">
                <View className="flex-col gap-3">
                  <Text className="text-lg ">Destination Category</Text>
                  <Select
                    options={[
                      "MainGate",
                      "Backgate",
                      "Law/Science",
                      "Management/Env",
                    ]}
                    onSelect={handleSelect}
                    placeholder="Select a category for your destination"
                  />
                </View>
                <View className="flex-col gap-3">
                  <Text className="text-lg ">Ride Category</Text>
                  <Select
                    options={["Shuttle", "Bus", "Minivan", "Drop"]}
                    onSelect={handleSelect}
                    placeholder="Select your ride option"
                  />
                </View>
              </View>

              <View className="flex-row w-full gap-4">
                {buttonOp.map((b) => (
                  <Button
                    onPress={() => router.push(b.path as any)}
                    key={b.id}
                    className={
                      b.id === "Continue"
                        ? `flex-1 py-2  h-12 items-center justify-center`
                        : " flex-1 h-12 items-center justify-center bg-transparent border border-[#003380ff]"
                    }
                  >
                    <Text
                      className={
                        b.id === "Continue"
                          ? `text-lg`
                          : "text-lg text-[#003380ff]"
                      }
                    >
                      {b.id}
                    </Text>
                  </Button>
                ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      {/* <View className="flex-row items-center justify-center pt-10">
        <Text>Book a Ride</Text>
      </View> */}
    </SafeAreaView>
  );
}

const inputText = [
  {
    id: "Location",
    desc: "Please Enter your live location",
  },
  {
    id: "Destination",
    desc: "Please Enter your Destination",
  },
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
