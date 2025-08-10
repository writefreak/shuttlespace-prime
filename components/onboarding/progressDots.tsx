import React from "react";
import { View } from "react-native";

const ProgressDots = ({ totalDots = 3, activeIndex = 0 }) => {
  return (
    <View className="flex-row gap-2">
      {Array.from({ length: totalDots }).map((_, index) => (
        <View
          key={index}
          className={`w-11 h-2 rounded-full ${
            index === activeIndex ? "bg-[#003380ff]" : "bg-white"
          }`}
        />
      ))}
    </View>
  );
};

export default ProgressDots;
