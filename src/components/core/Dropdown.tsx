import { ViewColumn } from "../Layout/ViewColumn";
import { Entypo } from "@expo/vector-icons";
import { PropsWithChildren } from "react";
import { Pressable, TextStyle } from "react-native";
import { Dropdown as DropdownBase } from "react-native-element-dropdown";
import { DropdownProps } from "react-native-element-dropdown/lib/typescript/components/Dropdown/model";

import { useAppTheme } from "@/styles/useAppTheme";

import { Text } from "./Text";

type DropdownItem = {
  id: string;
  [key: string]: string | null;
};

type Props<T extends DropdownItem> = Omit<DropdownProps<T>, "style" | "onChange"> & {
  label?: string;
  style?: TextStyle;
  error?: string;
  onChange: (id: string | null) => void;
  clearable?: boolean;
};

export function Dropdown<T extends DropdownItem>(props: PropsWithChildren<Props<T>>) {
  const { label, error, style, clearable, onChange, ...dropdownProps } = props;

  const { colors, fontFamily, fontBold, borderRadius } = useAppTheme();

  return (
    <ViewColumn width={style?.width || "100%"} flex={style?.flex} gap={2}>
      {label && <Text style={{ marginLeft: 8, fontSize: 12, color: colors.textSecondary }}>{label}</Text>}
      <DropdownBase
        {...dropdownProps}
        onChange={item => onChange(item.id)}
        autoScroll={false}
        placeholderStyle={{
          fontSize: 14,
          color: colors.gray[4],
        }}
        renderRightIcon={() =>
          !clearable ? null : (
            <Pressable
              style={({ pressed }) => ({
                margin: 0,
                backgroundColor: pressed ? colors.gray[8] : colors.white,
                padding: 4,
                borderRadius,
              })}
              onPress={() => onChange(null)}
            >
              <Entypo name="cross" size={20} color={colors.gray[4]} style={{ textAlign: "center" }} />
            </Pressable>
          )
        }
        renderItem={(item, selected) => (
          <Text
            style={{
              padding: 8,
              fontSize: 14,
              fontFamily: selected ? fontBold : fontFamily,
              color: colors.black,
              backgroundColor: selected ? colors.gray[8] : colors.white,
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
          paddingVertical: clearable ? 4 : 8,
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
