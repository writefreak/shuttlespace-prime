import React, { useEffect, useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

interface SelectProps {
  options: string[];
  onSelect: (value: string) => void;
  placeholder?: string;
  value?: string | null; // <-- new prop for controlled value
}

const Select: React.FC<SelectProps> = ({
  options,
  onSelect,
  placeholder = "Select an option",
  value = null,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(value);

  // 🔑 Keep in sync with external changes
  useEffect(() => {
    if (value !== undefined) {
      setSelectedOption(value);
    }
  }, [value]);

  const toggleModal = () => setModalVisible(!isModalVisible);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    toggleModal();
  };

  return (
    <View className="relative">
      <TouchableOpacity
        onPress={toggleModal}
        className="bg-white p-4 border border-gray-300 rounded-lg"
      >
        <Text
          className={`text-lg ${selectedOption ? "text-black" : "text-gray-500"}`}
        >
          {selectedOption || placeholder}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleModal}
      >
        <View className="flex-1 justify-center items-center bg-white/50 backdrop-blur-xl bg-opacity-50">
          <View className="bg-white w-64 p-5 rounded-lg shadow-lg">
            <Text className="text-xl font-medium mb-4">{placeholder}</Text>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSelect(option)}
                className="p-3 py-4 border-b border-gray-200"
              >
                <Text className="text-lg">{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Select;
