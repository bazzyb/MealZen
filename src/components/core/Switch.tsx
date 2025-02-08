import { PropsWithChildren, forwardRef } from "react";
import { FlexAlignType, Switch as SwitchBase, SwitchProps, ViewStyle } from "react-native";

import { ViewColumn } from "@/components/Layout/ViewColumn";
import { useAppTheme } from "@/styles/useAppTheme";

import { Text } from "./Text";

type Props = Omit<SwitchProps, "style" | "value"> & {
  label?: string;
  value?: boolean;
  style?: ViewStyle;
  alignLabel?: FlexAlignType;
};

export const Switch = forwardRef<SwitchBase, PropsWithChildren<Props>>((props, ref) => {
  const { children, label, value, style, alignLabel, ...switchProps } = props;
  const { width, ...switchStyle } = style || {};

  const { colors } = useAppTheme();

  return (
    <ViewColumn width={width} flex={style?.flex} gap={2} alignItems={alignLabel || "flex-start"}>
      {label && <Text style={{ fontSize: 12, color: colors.textSecondary }}>{label}</Text>}
      <SwitchBase
        ref={ref}
        value={!!value}
        accessibilityLabel={`${label} switch`}
        thumbColor={colors.white}
        trackColor={{ true: colors.success, false: colors.disabled }}
        // same as trackColor -> false, but for ios
        ios_backgroundColor={colors.disabled}
        style={{ marginVertical: 12, transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }], ...switchStyle }}
        {...switchProps}
      >
        {children}
      </SwitchBase>
    </ViewColumn>
  );
});
