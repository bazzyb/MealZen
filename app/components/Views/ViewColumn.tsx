import { PropsWithChildren } from "react";
import { View, ViewStyle } from "react-native";

type Props = Omit<ViewStyle, "display" | "flexDirection">;

export function ViewColumn({ children, ...viewProps }: PropsWithChildren<Props>) {
  return <View style={{ display: "flex", flexDirection: "column", ...viewProps }}>{children}</View>;
}
