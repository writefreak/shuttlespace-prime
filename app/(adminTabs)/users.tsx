import { useEffect, useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UserList() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "https://shuttlespace-backend.vercel.app/api/users/getUser"
      );
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = (id: string) => {
    Alert.alert("Delete User", "Are you sure you want to delete this user?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            const res = await fetch(
              "https://shuttlespace-backend.vercel.app/api/users/deleteUser",
              {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: id }),
              }
            );

            if (res.ok) {
              // update local list so deleted user disappears
              setUsers(users.filter((u) => u.id !== id));
              Alert.alert("Success", "User has been deleted!");
            } else {
              const data = await res.json();
              Alert.alert("Error", data.error || "Failed to delete user");
            }
          } catch (err) {
            console.error(err);
            Alert.alert("Error", "Network or server issue");
          }
        },
      },
    ]);
  };
  ``;
  return (
    <SafeAreaView edges={["left", "right", "top"]} className="bg-white flex-1">
      <View className="px-4 pt-9 items-center bg-white pb-7">
        <Text className="text-2xl font-medium">Registered Users</Text>
      </View>

      <ScrollView className="pt-7 pb-7 space-y-4 px-4">
        <View className="gap-4 pb-10">
          {users.map((u) => (
            <View
              key={u.id}
              className="rounded-2xl border border-gray-300 bg-white"
            >
              {/* Top section */}
              <View className="flex-row items-center justify-between p-4">
                <View className="flex-row items-center gap-5">
                  <View className="h-16 w-16">
                    <Image
                      source={
                        u.img
                          ? { uri: u.img }
                          : require("../../assets/images/heritage-avatar.jpg")
                      }
                      className="w-full h-full rounded-full"
                    />
                  </View>
                  <View>
                    <Text className="text-lg font-medium">
                      {u.firstName} {u.lastName}
                    </Text>
                    <Text className="text-neutral-500">{u.role}</Text>
                  </View>
                </View>
              </View>

              {/* Bottom section */}
              <View className="border-t border-gray-200 p-4">
                <View className="flex-row items-center justify-between">
                  <Text className="text-neutral-500">Email: {u.email}</Text>
                  <TouchableOpacity
                    onPress={() => handleDelete(u.id)}
                    className="px-3 py-1 w-32 items-center rounded-full bg-red-600"
                  >
                    <Text className="text-white">Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
