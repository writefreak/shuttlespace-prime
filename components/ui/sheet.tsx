import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";

type Side = "left" | "right" | "top" | "bottom";

interface SheetProps {
  side?: Side;
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string; // for extra styling on sheet container
  backdropClassName?: string; // for backdrop styling
}

const { width, height } = Dimensions.get("window");

export default function Sheet({
  side = "bottom",
  visible,
  onClose,
  children,
  className = "",
  backdropClassName = "",
}: SheetProps) {
  const translate = useRef(new Animated.Value(0)).current;
  const [mounted, setMounted] = useState(visible);

  const getInitialPosition = () => {
    switch (side) {
      case "left":
        return -width * 0.75;
      case "right":
        return width * 0.75;
      case "top":
        return -height * 0.33;
      case "bottom":
      default:
        return height * 0.33;
    }
  };

  useEffect(() => {
    if (visible) setMounted(true);

    Animated.spring(translate, {
      toValue: visible ? 0 : getInitialPosition(),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (!visible && finished) setMounted(false);
    });
  }, [visible, side]);

  const onGestureEvent = Animated.event(
    [
      {
        nativeEvent:
          side === "left" || side === "right"
            ? { translationX: translate }
            : { translationY: translate },
      },
    ],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = (event: PanGestureHandlerGestureEvent) => {
    const { translationX, translationY, state } = event.nativeEvent;

    if (state === 5 || state === 3) {
      const moved =
        side === "left" || side === "right" ? translationX : translationY;
      const threshold =
        (side === "left" || side === "right" ? width * 0.75 : height * 0.33) /
        4;

      const shouldClose =
        (side === "left" && moved < -threshold) ||
        (side === "right" && moved > threshold) ||
        (side === "top" && moved < -threshold) ||
        (side === "bottom" && moved > threshold);

      if (shouldClose) {
        Animated.timing(translate, {
          toValue: getInitialPosition(),
          duration: 200,
          useNativeDriver: true,
        }).start(() => onClose());
      } else {
        Animated.spring(translate, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    }
  };

  const transformStyle =
    side === "left" || side === "right"
      ? { transform: [{ translateX: translate }] }
      : { transform: [{ translateY: translate }] };

  const AnimatedView = Animated.createAnimatedComponent(View);

  if (!mounted) return null;

  // Use NativeWind classes for sizing and positioning:

  const baseClasses =
    side === "left"
      ? "absolute top-0 bottom-0 left-0 w-3/4 bg-white rounded-tr-3xl rounded-br-3xl shadow-lg"
      : side === "right"
        ? "absolute top-0 bottom-0 right-0 w-3/4 bg-white rounded-tl-3xl rounded-bl-3xl shadow-lg"
        : side === "top"
          ? "absolute left-0 right-0 top-0 h-1/3 bg-white rounded-bl-3xl rounded-br-3xl shadow-lg"
          : // bottom
            "absolute left-0 right-0 bottom-0 h-1/3 bg-white rounded-tl-3xl rounded-tr-3xl shadow-lg";

  return (
    <View
      pointerEvents={visible ? "auto" : "none"}
      className="absolute inset-0 z-50"
    >
      {/* Backdrop */}
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View className={`flex-1 bg-black/50 ${backdropClassName}`} />
      </TouchableWithoutFeedback>

      {/* Sheet */}
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
      >
        <AnimatedView
          style={transformStyle}
          className={`${baseClasses} ${className}`}
        >
          {children}
        </AnimatedView>
      </PanGestureHandler>
    </View>
  );
}
