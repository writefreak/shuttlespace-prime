import { View } from "react-native";

interface Props {
  className?: string;
  children?: React.ReactNode;
}

export default function Badge({ className, children }: Props) {
  return (
    <View
      className={`bg-[#003380ff]/20 flex items-center py-1 rounded-full ${className}`}
    >
      {children}
    </View>
  );
}
