import AntDesign from "@expo/vector-icons/AntDesign";
import { Animated, Easing } from "react-native";

const spinValue = new Animated.Value(0);

Animated.loop(
  Animated.timing(spinValue, {
    toValue: 1,
    duration: 500,
    easing: Easing.linear,
    useNativeDriver: true,
  }),
).start(() => {
  spinValue.setValue(0);
});

export const spin = spinValue.interpolate({
  inputRange: [0, 1],
  outputRange: ["0deg", "360deg"],
});

export function LoadingIcon() {
  return (
    <Animated.View style={{ transform: [{ rotate: spin }] }}>
      <AntDesign name="loading2" size={24} color="black" />
    </Animated.View>
  );
}
