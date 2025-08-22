import Button from "@/components/ui/button";
import NavHeader from "@/components/ui/navHeader";
import Select from "@/components/ui/select";
import { Link } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vehicleSerialNo, setVehicleSerialNo] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      return Alert.alert("Error", "Please fill in all required fields");
    }

    try {
      setLoading(true);

      const response = await fetch(
        "https://shuttlespace-backend.vercel.app/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
            vehicleSerialNo,
          }),
        }
      );
      const data = await response.json();

      if (!response) {
        return Alert.alert(
          "Login Failed",
          data.error || "Something Went Wrong"
        );
      }

      Alert.alert("Login Successful:", data.user);
    } catch (error: any) {
      console.error("Login error:", error);
      Alert.alert("Error", error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView edges={["top", "left", "right"]} className="bg-white flex-1">
      <ScrollView>
        <NavHeader>
          <Text className="text-xl font-semibold text-[#003380ff]">
            Sign into Your Account
          </Text>
        </NavHeader>
        <View className="p-4">
          <View className="pt-7 px-4 gap-10">
            <View className="gap-2">
              <Text className="text-3xl font-medium text-[#003380ff]">
                Welcome Back 👋
              </Text>
              <Text className="text-lg text-neutral-500">
                Sign into Your Account Here
              </Text>
            </View>
            <View className="gap-7 pb-5">
              {passDetails.map((p) => (
                <View key={p.id} className="gap-3">
                  <Text className="text-neutral-500">{p.value}</Text>
                  <TextInput
                    className={
                      "py-5 md:py-3 bg-gray-100 px-4 rounded-xl outline-none md:w-full"
                    }
                    placeholder={p.placeholder}
                  />
                </View>
              ))}
              <View className="gap-3">
                <Text className="text-neutral-500">
                  Are you a Passenger or Driver?
                </Text>
                <Select options={["Passenger", "Driver"]} onSelect={setRole} />
              </View>
            </View>
          </View>
          {role == "Driver" && (
            <View className="gap-7 p-4 pt-5">
              {driveDetails.map((d) => (
                <View key={d.id} className="gap-3">
                  <Text className="text-neutral-500">{d.value}</Text>
                  <TextInput
                    className={
                      "py-5 md:py-3 bg-gray-100 px-4 rounded-xl outline-none md:w-full"
                    }
                    placeholder={d.placeholder}
                  />
                </View>
              ))}
            </View>
          )}
          <View className="px-4 gap-4">
            <Button
              onPress={handleLogin}
              className="w-full h-12 items-center justify-center bg-[#003380ff] rounded-xl"
            >
              <Text className="text-xl text-white">
                {loading ? "Logging you in..." : "Login "}
              </Text>
            </Button>
            <View className="flex-row gap-2">
              <Text className="text-neutral-500">Don't have an account?</Text>
              <Link href={"/signup"} className="text-[#003380ff] underline">
                Sign Up Here
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const passDetails = [
  {
    id: 1,
    placeholder: "Enter your First Name",
    value: "Email",
  },
  {
    id: 2,
    placeholder: "Enter your Last Name",
    value: "Password",
  },
];
const driveDetails = [
  {
    id: 2,
    placeholder: "Enter your vehicle serial number",
    value: "Serial Number",
  },
];

const roles = [
  {
    id: 1,
    slug: "Passenger",
  },
  {
    id: 2,
    slug: "Driver",
  },
];
