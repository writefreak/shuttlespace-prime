import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Location = {
  id: string | number;
  name: string;
  category?: string;
};

type Props = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  apiUrl: string; // your endpoint URL
  onSelectItem?: (item: Location) => void; // 🔥 new optional prop
};

export default function LocationInput({
  placeholder,
  value,
  onChangeText,
  apiUrl,
  onSelectItem,
}: Props) {
  const [query, setQuery] = useState(value);
  const [results, setResults] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (selected || query.length < 1) {
      setResults([]);
      setLoading(false);
      return;
    }

    const timeout = setTimeout(() => {
      setLoading(true);
      fetch(`${apiUrl}?q=${encodeURIComponent(query)}`)
        .then((res) => res.json())
        .then((data) => {
          setResults(data);
        })
        .catch((err) => {
          console.error(err);
          setResults([]);
        })
        .finally(() => setLoading(false));
    }, 300);

    return () => clearTimeout(timeout);
  }, [query, apiUrl, selected]);

  return (
    <View className="relative">
      <TextInput
        className="py-5 bg-gray-100 px-4 rounded-xl"
        placeholder={placeholder}
        value={query}
        onChangeText={(text) => {
          setSelected(false);
          setQuery(text);
          onChangeText(text);
        }}
      />

      {loading && (
        <View className="absolute right-4 top-5">
          <ActivityIndicator size="small" />
        </View>
      )}

      {results.length > 0 && (
        <FlatList
          keyboardShouldPersistTaps="handled"
          data={results}
          keyExtractor={(item) => item.id.toString()}
          style={{
            position: "absolute",
            top: 60,
            left: 0,
            right: 0,
            backgroundColor: "white",
            borderRadius: 12,
            maxHeight: 150,
            elevation: 3,
            zIndex: 100,
          }}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="p-3"
              onPress={() => {
                setSelected(true);
                setQuery(item.name);
                onChangeText(item.name);
                onSelectItem && onSelectItem(item); // 💡 send whole object
                setResults([]);
              }}
            >
              <Text>{item.name}</Text>
              {/* {item.category && (
                <Text className="text-xs text-gray-500">{item.category}</Text>
              )} */}
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}
