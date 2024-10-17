import { Button } from "../Button";
import dayjs from "dayjs";

import { useAppTheme } from "@/styles/useAppTheme";

type Props = {
  date: Date;
  handleOpenPicker: () => void;
};

export function PickerButton({ date, handleOpenPicker }: Props) {
  const { colors } = useAppTheme();

  return (
    <Button
      onPress={handleOpenPicker}
      textColor={colors.black}
      style={{
        borderColor: colors.black,
        borderWidth: 1,
        backgroundColor: colors.white,
      }}
    >
      {dayjs(date).format("YYYY-MM-DD")}
    </Button>
  );
}
