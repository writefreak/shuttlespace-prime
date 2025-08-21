import Button from "@/components/ui/button";
import NavHeader from "@/components/ui/navHeader";
import Select from "@/components/ui/select";
import { Link, router } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const [role, setRole] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

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
              onPress={() => router.push("/home")}
              className="w-full h-12 items-center justify-center"
            >
              <Text className="text-xl">Login</Text>
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
