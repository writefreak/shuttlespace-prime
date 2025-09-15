"use client";
import Button from "@/components/ui/button";
import NavHeader from "@/components/ui/navHeader";
import Select from "@/components/ui/select";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Signup() {
  const [role, setRole] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vehicleSerialNo, setVehicleSerialNo] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!email || !password || !firstName || !lastName) {
      return Alert.alert("Error", "Please fill in all required fields");
    }

    // if (password.length < 6) {
    //   return Alert.alert("Error", "Password must be at least 6 characters");
    // }

    setLoading(true);
    try {
      const payload = {
        email,
        password,
        firstName,
        lastName,
        role,
        vehicleSerialNo,
        vehicleType,
      };

      if (role === "Driver") {
        payload.vehicleSerialNo = vehicleSerialNo;
        payload.vehicleType = vehicleType;
        console.log(payload.role);
      }

      if (role === "Driver" && vehicleSerialNo) {
        await AsyncStorage.setItem("vehicleSerialNo", vehicleSerialNo);
      }
      if (role === "Driver" && vehicleType) {
        await AsyncStorage.setItem("vehicleType", vehicleType);
      }
      const res = await fetch(
        "https://shuttlespace-backend.vercel.app/api/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      console.log("Raw response:", res);

      let data;
      try {
        data = await res.json();
      } catch {
        const text = await res.text(); // fallback for non-JSON
        throw new Error(`Invalid JSON response: ${text}`);
      }

      if (res.ok) {
        Alert.alert("Success", "User created!");
        console.log("Created user:", data);
        router.push("/login");
      } else {
        Alert.alert("Error", data.error || "Signup failed");
        console.error("Signup failed:", data);
      }
    } catch (err) {
      console.error("Signup error:", err);
      Alert.alert("Error", "Network or server issue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView edges={["top", "left", "right"]} className="bg-white flex-1">
      <NavHeader>
        <Text className="text-xl font-semibold text-[#003380ff]">
          Create Account
        </Text>
      </NavHeader>
      <ScrollView>
        <View className="p-4 pb-12">
          <View className="pt-4 px-4 gap-10">
            <View className="gap-2">
              <Text className="text-3xl font-medium">Hello, Welcome 👋</Text>
              <Text className="text-lg text-neutral-500">
                Create Your Account Here
              </Text>
            </View>

            <View className="gap-7 pb-5">
              <View className="gap-3">
                <Text className="text-neutral-500">First Name</Text>
                <TextInput
                  value={firstName}
                  onChangeText={setFirstName}
                  placeholder="Enter your First Name"
                  placeholderTextColor="#9ca3af"
                  className="py-5 bg-gray-100 px-4 rounded-xl"
                />
              </View>

              <View className="gap-3">
                <Text className="text-neutral-500">Last Name</Text>
                <TextInput
                  value={lastName}
                  onChangeText={setLastName}
                  placeholder="Enter your Last Name"
                  placeholderTextColor="#9ca3af"
                  className="py-5 bg-gray-100 px-4 rounded-xl"
                />
              </View>

              <View className="gap-3">
                <Text className="text-neutral-500">Email</Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your Email"
                  keyboardType="email-address"
                  placeholderTextColor="#9ca3af"
                  className="py-5 bg-gray-100 px-4 rounded-xl"
                />
              </View>

              <View className="gap-3">
                <Text className="text-neutral-500">Password</Text>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your Password"
                  placeholderTextColor="#9ca3af"
                  className="py-5 bg-gray-100 px-4 rounded-xl"
                />
              </View>

              <View className="gap-3">
                <Text className="text-neutral-500">
                  Are you a Passenger or Driver?
                </Text>
                <Select options={["Passenger", "Driver"]} onSelect={setRole} />
              </View>
            </View>
          </View>

          {role === "Driver" && (
            <View className="gap-7 p-4 pt-5">
              <View className="gap-3">
                <Text className="text-neutral-500">Serial Number</Text>
                <TextInput
                  value={vehicleSerialNo}
                  onChangeText={setVehicleSerialNo}
                  placeholder="Enter your Shuttle Serial Number"
                  placeholderTextColor="#9ca3af"
                  className="py-5 bg-gray-100 px-4 rounded-xl"
                />
              </View>

              <View className="gap-3">
                <Text className="text-neutral-500">Car Model</Text>
                {/* <TextInput
                  value={vehicleType}
                  onChangeText={setVehicleType}
                  placeholder="Enter your car model"
                  className="py-5 bg-gray-100 px-4 rounded-xl"
                /> */}
                <Select
                  onSelect={setVehicleType}
                  options={["Shuttle", "Bus", "Minibus", "Drop"]}
                />
              </View>
            </View>
          )}

          <View className="px-4 gap-4">
            <Button
              onPress={handleSignup}
              className="w-full h-12 items-center justify-center bg-[#003380ff] rounded-xl"
            >
              <Text className="text-xl text-white">
                {loading ? "Creating..." : "Create Account"}
              </Text>
            </Button>

            <View className="flex-row gap-2">
              <Text className="text-neutral-500">Already have an account?</Text>
              <Link href={"/login"} className="text-[#003380ff] underline">
                Login here
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
