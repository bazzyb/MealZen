import { PropsWithChildren } from "react";
import { View, ViewStyle } from "react-native";

type Props = Omit<ViewStyle, "display" | "flexDirection">;

export function ViewRow({ children, ...viewProps }: PropsWithChildren<Props>) {
  return <View style={{ display: "flex", flexDirection: "row", ...viewProps }}>{children}</View>;
}
