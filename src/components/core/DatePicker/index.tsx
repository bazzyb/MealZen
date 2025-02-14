import { Platform } from "react-native";

import { ViewColumn } from "@/components/Layout/ViewColumn";
import { Text } from "@/components/core/Text";
import { useAppTheme } from "@/styles/useAppTheme";

import { AndroidDatePicker } from "./AndroidDatePicker";
import { IOSDatePicker } from "./IOSDatePicker";

type Props = {
  label?: string;
  value: Date;
  handleChangeDate: (date: Date) => void;
  error?: string;
};

export function DatePicker({ label, value, handleChangeDate, error }: Props) {
  const { colors } = useAppTheme();

  return (
    <ViewColumn width={"100%"} gap={2}>
      {label && <Text style={{ marginLeft: 8, fontSize: 12, color: colors.textSecondary }}>{label}</Text>}
      {Platform.OS === "ios" ? (
        <IOSDatePicker value={value} handleChangeDate={handleChangeDate} />
      ) : (
        <AndroidDatePicker value={value} handleChangeDate={handleChangeDate} />
      )}
      {error && (
        <Text style={{ marginLeft: 8, fontSize: 12, color: colors.formErrorText }} bold>
          {error}
        </Text>
      )}
    </ViewColumn>
  );
}
