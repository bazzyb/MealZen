import { ViewColumn } from "../Layout/ViewColumn";
import { PropsWithChildren } from "react";
import { TextStyle } from "react-native";
import { Dropdown as DropdownBase } from "react-native-element-dropdown";
import { DropdownProps } from "react-native-element-dropdown/lib/typescript/components/Dropdown/model";

import { useAppTheme } from "@/styles/useAppTheme";

import { Text } from "./Text";

type DrowndownItem = Record<string, string | null>;

type Props<T extends DrowndownItem> = Omit<DropdownProps<T>, "style"> & {
  label?: string;
  style?: TextStyle;
  error?: string;
};

export function Dropdown<T extends DrowndownItem>(props: PropsWithChildren<Props<T>>) {
  const { label, error, style, ...dropdownProps } = props;

  const { colors, fontFamily, fontBold, borderRadius } = useAppTheme();

  return (
    <ViewColumn width={style?.width || "100%"} flex={style?.flex} gap={2}>
      {label && <Text style={{ marginLeft: 8, fontSize: 12, color: colors.label }}>{label}</Text>}
      <DropdownBase
        {...dropdownProps}
        autoScroll={false}
        renderItem={(item, selected) => (
          <Text
            style={{
              padding: 8,
              fontSize: 14,
              fontFamily: selected ? fontBold : fontFamily,
              color: colors.black,
              backgroundColor: selected ? colors.gray[0] : colors.white,
            }}
          >
            {item[dropdownProps.labelField]}
          </Text>
        )}
        selectedTextStyle={{
          fontSize: 14,
        }}
        containerStyle={{
          backgroundColor: colors.white,
          borderRadius,
          marginBottom: 32,
        }}
        inputSearchStyle={{
          borderColor: colors.gray[3],
          borderRadius,
          height: 32,
          fontSize: 14,
        }}
        style={{
          width: "100%",
          paddingVertical: 8,
          paddingHorizontal: 16,
          borderRadius,
          borderWidth: error ? 2 : 1,
          borderColor: error ? colors.errorLight : colors.gray[2],
          backgroundColor: colors.white,
        }}
      />
      {error && (
        <Text style={{ marginLeft: 8, fontSize: 12, color: colors.error }} bold>
          {error}
        </Text>
      )}
    </ViewColumn>
  );
}
