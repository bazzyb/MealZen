import { ViewColumn } from "../Layout/ViewColumn";
import { PropsWithChildren, forwardRef } from "react";
import { FlexAlignType, Switch as SwitchBase, SwitchProps, ViewStyle } from "react-native";

import { useAppTheme } from "@/styles/useAppTheme";

import { Text } from "./Text";

type Props = Omit<SwitchProps, "style" | "value"> & {
  label?: string;
  value?: boolean;
  style?: ViewStyle;
  error?: string;
  alignLabel?: FlexAlignType;
};

export const Switch = forwardRef<SwitchBase, PropsWithChildren<Props>>((props, ref) => {
  const { children, label, value, error, style, alignLabel, ...switchProps } = props;
  const { width, ...switchStyle } = style || {};

  const { colors } = useAppTheme();

  return (
    <ViewColumn width={width} flex={style?.flex} gap={2} alignItems={alignLabel || "flex-start"}>
      {label && <Text style={{ fontSize: 12, color: colors.label }}>{label}</Text>}
      <SwitchBase
        ref={ref}
        value={!!value}
        accessibilityLabel={`${label} switch`}
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={value ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        style={switchStyle}
        {...switchProps}
      >
        {children}
      </SwitchBase>
      {error && (
        <Text style={{ marginLeft: 8, fontSize: 12, color: colors.error }} bold>
          {error}
        </Text>
      )}
    </ViewColumn>
  );
});
