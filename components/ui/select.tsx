import React, { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

interface SelectProps {
  options: string[]; // List of options
  onSelect: (value: string) => void; // Callback when an option is selected
  placeholder?: string; // Placeholder text
}

const Select: React.FC<SelectProps> = ({
  options,
  onSelect,
  placeholder = "Select an option",
}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Show the modal
  const toggleModal = () => setModalVisible(!isModalVisible);

  // Handle option selection
  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onSelect(option); // Trigger callback with selected option
    toggleModal(); // Close the modal
  };

  return (
    <View className="relative">
      {/* Select button that shows the currently selected option */}
      <TouchableOpacity
        onPress={toggleModal}
        className="bg-white p-4 border placeholder:text-gray-400 border-gray-300 rounded-lg"
      >
        <Text className="text-lg text-gray-500">
          {selectedOption || placeholder}
        </Text>
      </TouchableOpacity>

      {/* Modal displaying options */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleModal}
      >
        <View className="flex-1 justify-center items-center bg-white/80 backdrop-blur-xl bg-opacity-50">
          <View className="bg-white p-4 rounded-lg shadow-lg">
            <Text className="text-lg font-bold mb-4 ">{placeholder}</Text>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSelect(option)}
                className="p-3 border-b border-gray-200"
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
