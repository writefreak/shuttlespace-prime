import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function Timer() {
  const [timeLeft, setTimeLeft] = useState(180);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <View className="h-52 bg-[#003380ff]/20 rounded-xl">
      <View className="flex-1 gap-3 items-center justify-center">
        <Text className="text-2xl text-[#003380ff]">Your Ride Arrives in</Text>
        <Text className="text-4xl font-bold text-[#003380ff]">
          {minutes}:{seconds}
        </Text>
      </View>
    </View>
  );
}
